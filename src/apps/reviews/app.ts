import { ReviewsController } from "./controller/controller";
import { ReviewDataAccess} from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { reviewSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";


const dbConnection = connection.switch('homenest-reviews')
const db = new DB(dbConnection)
const ReviewModel = db.createModel('Review', reviewSchema)
const dataAccess  = new ReviewDataAccess(ReviewModel)

const controller = new ReviewsController(dataAccess)

export const reviewsRoutes = routesWrapper(controller, authenticator)


