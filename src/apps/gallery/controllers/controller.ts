import { NextFunction, Request, Response } from "express";
import { DataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { Gallery } from "../data-access/model";

export class Controller extends GenericController<DataAccess>{
    constructor(dataAccess: DataAccess){
        super(dataAccess)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const inputData:Gallery = req.body

        try {
            const exisitingDoc = await this.dataAccess.findByReferenceId(inputData.assetId)

            if(exisitingDoc){
                this.respondWithConflict(res)
            } 
            const newDocument = await this.dataAccess.createNew(inputData)
            this.respondWithCreatedResource(newDocument.id, res)
        } catch (error) {
            next(error)
        }   
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = req.params.assetId

        try {
            const foundDocument = await this.dataAccess.findByReferenceId(assetId)

            if(foundDocument){
                this.respondWithFoundResource(foundDocument, res)
            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = req.params.assetId
        const updateDoc = req.body

        try {
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(assetId, 
                updateDoc)

            if(updatedDoc){
                this.respondWithUpdatedResource(updatedDoc.id, res)
            } else{
                const newDoc = await this.dataAccess.createNew(updateDoc)
                this.respondWithCreatedResource(newDoc.id, res)
            }

        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = req.params.assetId
        const updateDoc = req.body

        try {
            const modifiedDoc = await this.dataAccess.findByIdAndUpdate(assetId, 
                updateDoc)

            if(modifiedDoc){
                this.respondWithModifiedResource(modifiedDoc.id, res)
            } else{
              this.respondWithNotFound(res)
            }

        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) => {
        const assetId = req.params.assetId

        try {
            const deletedDoc = await this.dataAccess.findByIdAndDelete(assetId)

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

