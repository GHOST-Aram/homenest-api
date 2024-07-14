import { NextFunction, Request, Response } from "express";
import { DataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import mongoose from "mongoose";
import { formatImage } from "../../../z-library/formatting/images";
import { HydratedGalleryDoc } from "../data-access/model";

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
                const newDocument = await this.dataAccess.createNew({
                    assetId,
                    images: Array.isArray(files)? this.createFileBuffers(files): []
                })

                this.respondWithCreatedResource(newDocument, res)
            } 
        } catch (error) {
            next(error)
        }   
    }

    private createFileBuffers = (files: Express.Multer.File[]) =>{
        //Take files array and return array that matches the structure of images array in 
        // the gallery schema
        return files.map(file =>(
            {
                name: `${Date.now()}_${file.originalname}`,
                data: file.buffer,
                contentType: file.mimetype
            }
        ))
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = req.params.assetId

        try {
            const foundDocument = await this.dataAccess.findByReferenceId(assetId)

            if(foundDocument){
                this.respondWithFoundResource({
                    ...foundDocument, 
                    images: this.formatImages(foundDocument.images)
                }, res)

            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    private formatImages = (images: { name: string, data: Buffer, contentType: string}[]) =>{
        return images.map(image => formatImage(image))
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const assetId = new mongoose.Types.ObjectId(req.params.assetId)
        const imageIds: string[] = req.body.imageIds //images _ids to be removed from gallery
        const imageFiles = req.files //Image Files to be added to exisiting gallery images

        let modifiedDoc: HydratedGalleryDoc | null = null
        
        try {
            if(Array.isArray(imageFiles)){
                const filesBuffers = this.createFileBuffers(imageFiles)

                modifiedDoc = await this.dataAccess.addImagesToExistingGallery(filesBuffers, 
                    assetId)
            } 
            
            if(Array.isArray(imageIds)){
                modifiedDoc = await this.dataAccess.removeImagesFromGallery(imageIds, assetId)
            }
           
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

