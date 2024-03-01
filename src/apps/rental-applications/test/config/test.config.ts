import express from "express"
import { DataAccess } from "../../data-access/mock-data-access"
import { ApplicationSubmission } from '../../data-access/model'
import { Controller } from "../../controllers/controller"
import { routesWrapper } from "../../urls/urls"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dataAccess = new DataAccess(ApplicationSubmission)
const controller = new Controller(dataAccess, 'applications')

const routes = routesWrapper(controller)

app.use('/application-submission', routes)

export { app }