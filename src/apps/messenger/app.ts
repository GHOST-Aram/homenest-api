import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { Controller } from "./controllers/controller";
import { DataAccess } from "./data-access/data-access";
import { schema } from "./data-access/model";
import { routesWrapper } from "./urls/urls";


const dbConnection = connection.switch('messages')
const MessageModel = new DB(dbConnection).createModel('Message', schema)

const dataAccess =  new DataAccess(MessageModel)
const controller = new Controller(dataAccess)

export const messagesRoutes = routesWrapper(controller)