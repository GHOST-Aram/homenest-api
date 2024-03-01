import express, { Application } from "express"
import { routesWrapper } from "../../urls/urls"
import { RentalsController } from "../../controller/controller"
import { RentalDataAccess } from "../mocks/mock-data-access"
import { Rental } from "../../data-access/model"
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const controller = new RentalsController(new RentalDataAccess(Rental), 'properties')

app.use( '/rentals', routesWrapper(controller))

export { app }
