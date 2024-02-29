import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { gallerySchema } from "./data-access/model";
import { routesWrapper } from "./urls/urls";


const dbConnection = connection.switch('homenest-gallery')
const Gallery = new DB(dbConnection).createModel('Gallery', gallerySchema)


const dataAccess = new DataAccess(Gallery)
const controller = new Controller(dataAccess)

export const galleryRoutes = routesWrapper(controller)

