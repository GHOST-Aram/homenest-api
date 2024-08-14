import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { schema } from "./data-access/model";
import { connection } from "../../_config/config";
import { DB } from "../../z-library/db/db";

const dbConnection = connection.switch('homenest-viewing-scheduler')
const model = new DB(dbConnection).createModel('ViewingScheduler', schema)

const dataAccess = new DataAccess(model)
const controller = new Controller(dataAccess, 'viewing-scheduler')

export const routes = routesWrapper(controller)