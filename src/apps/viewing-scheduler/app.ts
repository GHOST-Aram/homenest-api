import { app } from "./config/config";
import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { schema } from "./data-access/model";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";

const dbConnection = connection.switch('homenest-viewing-scheduler')
const model = new DB(dbConnection).createModel('ViewingScheduler', schema)

const dataAccess = new DataAccess(model)
const controller = new Controller(dataAccess)

export const routes = routesWrapper(controller)