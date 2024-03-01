import { AuthController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { connection } from "../../config/config"

const authDbConnection = connection.getInitial()
const dataAccess  = new DataAccess(authDbConnection)
const controller = new AuthController(dataAccess)

export const authRoutes = routesWrapper(controller)


