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
                    this.respondWithUpdatedResource(updatedDoc.id, res)
                } else{
                    this.addNew(req, res, next)
                }
    
            } catch (error) {
                next(error)
            }
        }
        }


}
