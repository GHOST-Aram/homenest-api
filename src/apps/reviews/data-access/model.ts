import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose";

export interface Review{
    authorId: ObjectId
    propertyId: ObjectId
    content: string
    createdAt: Date
}

export type ReviewModel = Model<Review>

export const reviewSchema = new Schema<Review,ReviewModel>({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export type HydratedReviewDoc = HydratedDocument<Review>
export const Review = model<Review, ReviewModel>(
    'Review', reviewSchema)