import { RentLimits, RentalDataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { Paginator } from "../../../z-library/HTTP/http-response";
import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import { searchablePaths } from "../data-access/model";

export class RentalsController extends GenericController<RentalDataAccess>{
    constructor (dataAccess: RentalDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const inputData = req.body
        const currentUser:any = req.user

        try {
            const newDocument = await this.dataAccess.createNew({
                ...inputData, landlord: currentUser._id.toString()
            })
            
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }   
    }

    public getByLandlordId = async(req: Request, res: Response, next: NextFunction) =>{
        const landlordId = req.params.id

        try {
            const rentals = await this.dataAccess.findByLandlordId(landlordId)
            this.respondWithFoundResource(rentals, res)
        } catch (error) {
            next(error)
        }
    }

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{

        const paginator: Paginator = this.paginate(req) 
        const query = req.query

        const rentLimits = this.getRentLimitsFromQuery(query)
        const searchDoc = this.createSearchDocument(query)
        
        try {
            const documents = await this.dataAccess.findBySearchDocument(
                paginator, { rentLimits, searchDoc }
            )

            this.respondWithFoundResource(documents, res)
        } catch (error) {
            next(error)
        }
    }

    private getRentLimitsFromQuery=(query: ParsedQs): RentLimits | false =>{
            const rentMin = Number(query.rentMin)
            const rentMax = Number(query.rentMax)

        if(rentMax && rentMin && rentMin !== rentMax)
            if( rentMax > rentMin )
                return { rentMax, rentMin }
            else
                return { rentMin: rentMax, rentMax: rentMin }
        return false
    }

    private createSearchDocument = (query:ParsedQs): {} =>{
        const keys = this.removeUnSearchablePaths(query)
        const searchDoc = this.createObject(keys, query)

        return searchDoc
    }

    private removeUnSearchablePaths = (query: ParsedQs):string[] =>{

        return Object.keys(query).filter(key => (
            // return if the the list of searchable paths includes the current key
            // && the value of the corresponding key in the search query is truthy
            searchablePaths.includes(key) && query[key] 
        ))
    }

    private createObject = (keys:string[], query: ParsedQs) =>{
        let searchDoc = {}
        keys.forEach(key =>{ 
            searchDoc = { ...searchDoc, [key]: query[key] }
        }
    )

        return searchDoc
    }


    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const referenceId = req.params.id
        const updateDoc = req.body
        const currentUser:any = req.user

        try {
            const updatedDoc = await this.dataAccess.findOneAndUpdate({id: referenceId, 
                landlord:currentUser._id.toString() }, 

                {
                    ...updateDoc, 
                    // Override the value of landlord - Ensure it's always curentUser's Id
                    landlord:currentUser._id.toString()
            })

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc, res)
            } else{
                this.addNew(req, res, next)
            }

        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const referenceId = req.params.id
        const updateDoc = req.body
        const currentUser:any = req.user
        const currentUserId: string = currentUser._id.toString()

        try {
            const modifiedDoc = await this.dataAccess.findOneAndUpdate(
                {id: referenceId, landlord: currentUserId}, 
                { 
                    ...updateDoc, 
                    //Override the value of landlord Id with currentUser id
                    // incase user attempts to change it.
                    landlord: currentUserId
                })

            if(modifiedDoc){
                this.respondWithModifiedResource(modifiedDoc, res)
            } else{
              this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {
        
        const referenceId = req.params.id
        const currentUser: any = req.user

        try {
            const deletedDoc = await this.dataAccess.findOneAndDelete(
                // Delete a document that matches the specified ID
                // The landlord Id of the document must also match the current user's Id. Users
                // are only allowed to delete the documents created by themselves.
                {
                    id: referenceId, 
                    landlord: currentUser._id.toString()
                }
            )

            if(deletedDoc){
                this.respondWithDeletedResource(deletedDoc.id, res)
            } else{
              this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }

}
