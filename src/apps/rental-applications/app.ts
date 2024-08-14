import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./urls/urls";
import { schema } from "./data-access/model";
import { connection } from "../../_config/config";
import { DB } from "../../z-library/db/db";


const dbConnection = connection.switch('rental-applications')
const Model = new DB(dbConnection).createModel('ApplicationSubmission', schema)

const dataAccess = new DataAccess(Model)
const controller = new Controller(dataAccess, 'rental-applications')

export const routes = routesWrapper(controller)