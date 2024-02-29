import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface Gallery{
    assetId: string,
    interior1: string
    interior2: string
    interior3: string
    interior4: string
    exterior1: string
    exterior2: string
    exterior3: string
    exterior4: string
}

export type GalleryModel = Model<Gallery>

const gallerySchema = new Schema<Gallery, GalleryModel>({
    assetId: { 
        type: String,
        required: true
    },
    interior1: {
        type: String,
        required: true
    },
    interior2: String,
    interior3: String,
    interior4: String,
    exterior1: String,
    exterior2: String,
    exterior3: String,
    exterior4: String
})

export type HydratedGalleryDoc = HydratedDocument<Gallery>

export const Gallery = model<Gallery,GalleryModel>('Gallery', gallerySchema)