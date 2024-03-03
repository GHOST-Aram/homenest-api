import { DataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { Request, Response, NextFunction } from "express";

export class Controller extends GenericController<DataAccess>{
    constructor(dataAccess: DataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) => {
        const inputData = req.body

        try {
            //Check if the document exists
            const existingDocument = await this.dataAccess.findExistingSchedule(
                inputData.tenant, inputData.property)

            if(existingDocument){
                this.respondWithConflict(res)
            } else {
                const newDocument = await this.dataAccess.createNew(inputData)
                this.respondWithCreatedResource(newDocument, res)
            }

        } catch (error) {
            next(error)
        } 
    }

    public getByPropertyId = async(req: Request, res: Response, next: NextFunction) =>{
        const tenantId = req.params.id
        const pagination = this.paginate(req)

        try{
            const application =  await this.dataAccess.findByPropertyId(tenantId, pagination)

            this.respondWithFoundResource(application, res)
        } catch (error) {
            next(error)
        }
    }

    public  getByTenantId = async(req: Request, res: Response, next: NextFunction) =>{
        const tenantId = req.params.id
        const pagination = this.paginate(req)

        try{
            const application =  await this.dataAccess.findByTenantId(tenantId, pagination)

            this.respondWithFoundResource(application, res)
        } catch (error) {
            next(error)
        }
    }
}