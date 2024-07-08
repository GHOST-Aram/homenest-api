import { HydratedDocument, Model, Schema, model } from "mongoose"
import { ObjectId } from "mongoose"

export interface Gallery {

    assetId: ObjectId,
    images: {
        id: string
        name: string
        data: Buffer 
        contentType: string
    }[]
}

export type GalleryModel = Model<Gallery>

export const gallerySchema = new Schema<Gallery, GalleryModel>({
    assetId: { 
        type: Schema.Types.ObjectId,
        required: true
    },
    images: [{
        id: String,
        name: String,
        data: Buffer,
        contentType: String
    }]
})

export type HydratedGalleryDoc = HydratedDocument<Gallery>
export const Gallery = model<Gallery,GalleryModel>('Gallery', gallerySchema)