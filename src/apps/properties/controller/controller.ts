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
                ...inputData, agentId: currentUser._id.toString()
            })
            
            this.respondWithCreatedResource(newDocument, res)
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
                agentId:currentUser._id.toString() }, 
                {...updateDoc, agentId:currentUser._id.toString()}
            )

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc, res)
            } else{
                this.addNew(req, res, next)
            }

        } catch (error) {
            next(error)
        }
    }

}