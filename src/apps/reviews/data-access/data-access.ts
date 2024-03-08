import { Paginator } from "../../../z-library/HTTP/http-response"
import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { HydratedReviewDoc, Review, ReviewModel } from "./model"

export class ReviewDataAccess extends GenericDataAccess<ReviewModel, Review>{

    public findByPropertyId = async(propertyId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

            //Returns many reviews on a property with a specific id

        return await this.model.find({propertyId: propertyId})
            .skip(paginator.skipDocs)
            .limit(paginator.limit)
           
    }
}
