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
}