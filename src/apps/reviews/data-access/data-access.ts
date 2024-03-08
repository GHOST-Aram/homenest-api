import { Paginator } from "../../../z-library/HTTP/http-response"
import { GenericDataAccess } from "../../../z-library/bases/generic-data-access"
import { HydratedReviewDoc, Review, ReviewModel } from "./model"
import { Types } from 'mongoose'

export class ReviewDataAccess extends GenericDataAccess<ReviewModel, Review>{

    public findByPropertyId = async(propertyId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

            //Returns many reviews on a property with a specific id

        return await this.model.find({propertyId: propertyId})
            .skip(paginator.skipDocs)
            .limit(paginator.limit)     
    }

    public findOneAndUpdate = async({ id, authorId }: SearchDoc, updatedDoc: Object
        ): Promise<HydratedReviewDoc | null> =>{
        return await this.model.findOneAndUpdate({
            authorId,
            _id: new Types.ObjectId(id)
        }, updatedDoc, { new: true })
    }
    
    public findOneAndDelete = async({ id, authorId }: SearchDoc ): Promise<HydratedReviewDoc | null> =>{
        return await this.model.findOneAndDelete({
            authorId,
            _id: new Types.ObjectId(id)
        })
    }
}

export type SearchDoc = {
    id: string
    authorId: string
}
