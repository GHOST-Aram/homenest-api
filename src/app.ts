import { authRoutes } from "./apps/authenticator/app";
import { zero } from "./zero/zero";
import { galleryRoutes } from "./apps/gallery/app";
import { usersRouter } from "./apps/users/app";
import { propertyRoutes } from "./apps/properties/app";
import { messagesRoutes } from "./apps/messenger/app";
import { reviewsRoutes } from "./apps/reviews/app";
import { routes as viewingScheduleRoutes } from "./apps/viewing-scheduler/app";
import { routes as applicationsRoutes } from "./apps/rental-applications/app";
import { URLMetadata } from "./zero/zero/types";

const urlsData: URLMetadata[] = [

    { path: '/auth', router: authRoutes },
    { path: '/gallery', router: galleryRoutes },
    { path: '/users', router: usersRouter },
    { path: '/properties', router: propertyRoutes },
    { path: '/messages', router: messagesRoutes },
    { path: '/reviews', router: reviewsRoutes },
    { path: '/viewing-scheduler', router: viewingScheduleRoutes },
    { path: '/rental-applications', router: applicationsRoutes },
]


try {
    zero.configureUrls(urlsData)
    
} catch (error:any) {
    console.warn("Error occured while configuring urls: ", error.message)
}
//Handle errors -- Unknown path
zero.handleUnknownUrls()
zero.handleServerErrors()