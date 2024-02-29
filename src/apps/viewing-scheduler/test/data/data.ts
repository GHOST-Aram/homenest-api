import mongoose from "mongoose"

export const postData = {
    tenant: new mongoose.mongo.ObjectId(),
    property: new mongoose.mongo.ObjectId(),
    viewDate: new Date().toLocaleDateString(),
    viewTime: new Date().toLocaleTimeString()
}

export const invalidData = {
    tenant: '684738274837g',
    property: 'yuhufd',
    viewDate: new Date().toLocaleDateString(),
    viewTime: new Date().toLocaleTimeString()
}