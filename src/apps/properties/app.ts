import { routesWrapper } from "./urls/urls";
import { RentalsController } from "./controller/controller";
import { RentalDataAccess } from "./data-access/data-access";
import { rentalSchema } from "./data-access/model";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";

const dbConnection = connection.switch('homenest-messages')
const Rental = new DB(dbConnection).createModel('Rental', rentalSchema)

const dataAccess = new RentalDataAccess(Rental)
const controller = new RentalsController(dataAccess)

export const propertyRoutes = routesWrapper(controller)

