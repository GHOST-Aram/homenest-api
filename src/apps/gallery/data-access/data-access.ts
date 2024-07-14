import mongoose from "mongoose";
import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { Gallery, GalleryModel, HydratedGalleryDoc } from "./model";

export class DataAccess extends GenericDataAccess<GalleryModel, Gallery>{
        constructor(model: GalleryModel){
            super(model)
        }

        public findByReferenceId = async(assetId: string): Promise<HydratedGalleryDoc | null> =>{
            return await this.model.findOne({ assetId })
        }
        public findByIdAndUpdate = async(assetId: string, updateDoc: Object): Promise<HydratedGalleryDoc | null> =>{
            return await this.model.findOneAndUpdate({ assetId }, updateDoc)
        }
        public findByIdAndDelete = async(assetId: string): Promise<HydratedGalleryDoc | null> =>{
            return await this.model.findOneAndDelete({ assetId })
        }

        public addImagesToExistingGallery = async(
            data: {
                name: string,
                data: Buffer,
                contentType: string
            }[], assetId: mongoose.Types.ObjectId
        ): Promise<HydratedGalleryDoc | null> =>{

            console.log(assetId)
                return await this.model.findOneAndUpdate({ assetId }, {
                    $push : { images : { $each : data } },
                },
                { new: true, useFindAndModify: false}
            )
        }
        
        public removeImagesFromGallery = async(
            imageIds: string[],
            assetId: mongoose.Types.ObjectId
        ): Promise<HydratedGalleryDoc | null> =>{

               return await this.model.findOneAndUpdate( { assetId },
                { $pull: { images: { _id: { $in: imageIds } } } },
                { new: true, useFindAndModify: false })
        }
    }
