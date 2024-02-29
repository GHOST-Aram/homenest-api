import express from "express"
import { Server } from "../z-library/server/server"
import 'dotenv/config'
import mongoose from "mongoose"

const app = express()

const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.logRequestsandResponses()
server.listenToRequests(Number(process.env.PORT), 'Gallery')

const dbUri = process.env.MONGODB_URI 

if(dbUri){
    mongoose.connect(dbUri).then(result =>{
        console.log('Gallery Connected to Homenest DB')
    }).catch(error => {
        console.log(error)
    })
}

export { app }

