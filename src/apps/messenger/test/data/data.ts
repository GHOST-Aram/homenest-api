import { mongo } from "mongoose";

export const postData = {
    sender: new mongo.ObjectId(),
    recipient: new mongo.ObjectId(),
    content: 'Lorem ipsum'
}

export const invalidData = {
    sender: new mongo.ObjectId(),
    content: '',
    showSender: 'false',
    showRecipent: 'false'
}

export const patchData = {
    showSender: false
}