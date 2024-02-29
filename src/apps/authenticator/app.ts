import { AuthController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";


const controller = new AuthController(dataAccess)

export const authRoutes = routesWrapper(controller)

// //Handle errors -- Unknown path
// app.use(httpErrors.handleUnknownUrls)
// app.use(httpErrors.handleServerErrors)
