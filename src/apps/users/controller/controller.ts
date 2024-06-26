import { Response, Request, NextFunction } from "express";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL, microserviceName: string){
        super(dataAccessLayer, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const userData = req.body

        try {
            const user = await this.dataAccess.findByEmail(userData.email)

            if(user)
                this.respondWithConflict(res)
            else {
                const user = await this.dataAccess.createNew(userData)
                this.respondWithCreatedResource(user, res)
            }
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.id
        const updateDoc = req.body
        const currentUser:any = req.user

        if(currentUser._id.toString() !== referenceId){
            this.respondWithForbidden(res)
        } else {

            try {
                const updatedDoc = await this.dataAccess.findByIdAndUpdate(referenceId, 
                    updateDoc)
    
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

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {
        const referenceId = req.params.id
        const currentUser:any = req.user

        if(currentUser._id.toString() !== referenceId){
            this.respondWithForbidden(res, 'User cannot delete information of other users.')
        } else {
            try {
                const deletedDoc = await this.dataAccess.findByIdAndDelete(referenceId)
    
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


}
