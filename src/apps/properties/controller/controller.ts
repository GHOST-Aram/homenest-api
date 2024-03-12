import { RentalDataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { Request, Response, NextFunction } from "express";

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

        try {
            const modifiedDoc = await this.dataAccess.findOneAndUpdate(
                {id: referenceId, landlord: currentUser._id.toString()}, 
                { 
                    ...updateDoc, 
                    //Override the value of landlord with currentUser id
                    // incase user attempts to change it.
                    landlord: updateDoc.landlord? currentUser._id.toString(): undefined 
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