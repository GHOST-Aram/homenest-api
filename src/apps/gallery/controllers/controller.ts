import { NextFunction, Request, Response } from "express";
import { DataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import mongoose from "mongoose";
import * as crypto from 'crypto'
import { formatImage } from "../../../z-library/formatting/images";

export class Controller extends GenericController<DataAccess>{
    constructor(dataAccess: DataAccess, microsericeName:string){
        super(dataAccess, microsericeName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const files = req.files
        const { assetId } = req.body

        try {
            const exisitingDoc = await this.dataAccess.findByReferenceId(assetId)

            if(exisitingDoc){
                this.respondWithConflict(res)
            }else {
                // Transform the files array
                const newDocument = await this.dataAccess.createNew({
                    assetId,
                    images: Array.isArray(files)? files.map(file =>(
                        {
                            id: `${Date.now()}-${crypto.randomBytes(12).toString('hex')}`,
                            name: `${Date.now()}_${file.originalname}`,
                            data: file.buffer,
                            contentType: file.mimetype
                        }
                    )): []
                })

                this.respondWithCreatedResource(newDocument, res)
            } 
        } catch (error) {
            next(error)
        }   
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = req.params.assetId

        try {
            const foundDocument = await this.dataAccess.findByReferenceId(assetId)

            if(foundDocument){
                this.respondWithFoundResource({
                    ...foundDocument, 
                    images: foundDocument.images.map(image => formatImage(image))
                }, res)
                
            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }


    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = req.params.assetId
        const files = req.files

        try {
            const updatedDoc = await this.dataAccess.findByIdAndUpdate(assetId,{
                assetId: new  mongoose.Types.ObjectId(assetId),
                images: Array.isArray(files)? files.map(file =>(
                    {
                        id: `${Date.now()}-${crypto.randomBytes(12).toString('hex')}`,
                        name: `${Date.now()}_${file.originalname}`,
                        data: file.buffer,
                        contentType: file.mimetype
                    }
                )): []
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

