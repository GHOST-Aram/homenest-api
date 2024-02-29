import { ObjectId, Model, Schema, HydratedDocument, model } from "mongoose";

export interface ViewScheduler{
    tenant: ObjectId
    property: ObjectId
    viewDate: string
    viewTime: string
    createdAt: Date
}

export type ViewSchedulerModel = Model<ViewScheduler>

export const schema = new Schema<ViewScheduler, ViewSchedulerModel>({
    tenant: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    property: {
        type: Schema.Types.ObjectId,
        required: true
    },
    viewDate: {
        type: String,
        required: true
    },
    viewTime: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export type HydratedViewScheduler = HydratedDocument<ViewScheduler>

export const ViewScheduler = model<ViewScheduler, ViewSchedulerModel>(
        'ViewScheduler', schema)
