import { Response, Request, NextFunction } from "express";
import { UsersDAL } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";

export class UsersController extends GenericController<UsersDAL>{

    constructor(dataAccessLayer: UsersDAL){
        super(dataAccessLayer)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const userData = req.body

        try {
            const user = await this.dataAccess.findByEmail(userData.email)

            if(user)
                this.respondWithConflict(res)
            else {
                const user = await this.dataAccess.createNew(userData)
                this.respondWithCreatedResource(user.id, res)
            }
        } catch (error) {
            next(error)
        }
    }
}
