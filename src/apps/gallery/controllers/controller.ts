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
                // Transform the files array
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
                    images: foundDocument.images.map(image => formatImage(image))
                }, res)

            } else{
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const assetId = new mongoose.Types.ObjectId(req.params.assetId)

        // Contains a specified operation pull or push
        // Contains string ids array when operation is pull
        const{ imageIds } = req.body

        const files = req.files

        // console.log("AssetId: ", assetId, "Files : ", files, "imageIds: ", imageIds)

        let modifiedDoc: HydratedGalleryDoc | null = null
        try {
            if(Array.isArray(files)){
                //Add more images to gallery with the incoming assetId
                const filesBuffers = this.createFileBuffers(files)
                modifiedDoc = await this.dataAccess.addImagesToExistingGallery(
                    filesBuffers, assetId)
            } 
            
            if(Array.isArray(imageIds)){
                //_ids of images to be removed from the Gallery
                modifiedDoc = await this.dataAccess.removeImagesFromGallery(
                    imageIds, assetId)
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

