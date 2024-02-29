import express from "express"
import { routesWrapper } from "../../routes/urls"
import { Controller } from "../../controllers/controller"
import { MockDataAccess } from "../../data-access/mock-data-access"
import { ViewScheduler } from "../../data-access/model"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dataAccess = new MockDataAccess(ViewScheduler)
const controller = new Controller(dataAccess)

app.use('/viewing-scheduler', routesWrapper(controller))

export { app }