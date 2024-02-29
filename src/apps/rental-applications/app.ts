import { app } from "./config/config";
import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./urls/urls";
import { ApplicationSubmission } from "./data-access/model";


const dataAccess = new DataAccess(ApplicationSubmission)
const controller = new Controller(dataAccess)
const routes = routesWrapper(controller)
app.use('/application-submission', routes)