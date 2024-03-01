import express from "express"
import { routesWrapper } from "../../urls/urls"
import { Controller } from "../../controllers/controller"
import { MockDataAccess } from "../../data-access/mock-data-access"
import { Message } from "../../data-access/model"

const app = express()

const dataAccess = new MockDataAccess(Message)
const controller = new Controller(dataAccess, 'messages')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/messages', routesWrapper(controller))

export { app }