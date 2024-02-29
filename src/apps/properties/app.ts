import { app } from "./config/config";
import { routesWrapper } from "./urls/urls";
import { RentalsController } from "./controller/controller";
import { RentalDataAccess } from "./data-access/data-access";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { Rental } from "./data-access/model";

const dataAccess = new RentalDataAccess(Rental)
const controller = new RentalsController(dataAccess)

const routes = routesWrapper(controller)

app.use('/rentals', routes)

app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)