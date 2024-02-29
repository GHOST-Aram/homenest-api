import { app } from "./config/config";
import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { ViewScheduler } from "./data-access/model";


const dataAccess = new DataAccess(ViewScheduler)
const controller = new Controller(dataAccess)

app.use('/viewing-scheduler', routesWrapper(controller))