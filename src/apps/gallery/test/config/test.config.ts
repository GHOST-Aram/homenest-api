import express from "express"
import { routesWrapper } from "../../urls/urls"
import { Controller } from "../../controllers/controller"
import { DataAccess } from "../mocks/data-access"
import { Gallery } from "../../data-access/model"


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dataAccess = new DataAccess(Gallery)
const controller = new Controller(dataAccess)
const routes = routesWrapper(controller)

app.use('/gallery', routes)

export { app }