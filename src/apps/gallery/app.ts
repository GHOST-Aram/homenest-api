import { app } from "./config/config";
import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { Gallery } from "./data-access/model";
import { routesWrapper } from "./urls/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";


const dataAccess = new DataAccess(Gallery)
const controller = new Controller(dataAccess)
const routes = routesWrapper(controller)

app.use('/gallery', routes)

app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)