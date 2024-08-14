import { authRoutes } from "./apps/authenticator/app";
import { app } from "./_config/config";
import { galleryRoutes } from "./apps/gallery/app";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { usersRouter } from "./apps/users/app";
import { propertyRoutes } from "./apps/properties/app";
import { messagesRoutes } from "./apps/messenger/app";
import { reviewsRoutes } from "./apps/reviews/app";
import { Response, Request } from "express";
import { routes as viewingScheduleRoutes } from "./apps/viewing-scheduler/app";
import { routes as applicationsRoutes } from "./apps/rental-applications/app";

app.get('/', (req: Request, res: Response) =>{
    res.status(200).json({ message: "Welcome to Homenest API" })
})
app.use('/auth', authRoutes)
app.use('/gallery', galleryRoutes)
app.use('/users', usersRouter)
app.use('/properties', propertyRoutes)
app.use('/messages', messagesRoutes)
app.use('/reviews', reviewsRoutes)
app.use('/viewing-scheduler', viewingScheduleRoutes)
app.use('/rental-applications', applicationsRoutes)

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)