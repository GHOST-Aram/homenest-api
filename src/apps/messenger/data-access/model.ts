import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose";

export interface Message{
    sender: ObjectId
    recipient: ObjectId
    content: string
    showSender?: boolean
    showRecipient?: boolean
    createdAt?: Date
}

export type MessageModel = Model<Message>

export const schema = new Schema<Message,MessageModel>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    showRecipient:{
        type: Boolean,
        default: true
    },
    showSender: {
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    } 
})

export type HydratedMessageDoc = HydratedDocument<Message>

export const Message = model<Message, MessageModel>('Message', schema)