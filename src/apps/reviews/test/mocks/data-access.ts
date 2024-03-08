import { jest } from '@jest/globals'
import { 
        HydratedReviewDoc, 
        Review, 
        ReviewModel 
} from '../../data-access/model'
import { Paginator } from '../../../../z-library/HTTP/http-response'
import { reviewData } from './raw-data'
import { ReviewDataAccess, SearchDoc } from '../../data-access/data-access'

const REVIEW_DATA = {
    authorId: '64c9e4f2df7cc072af2ac9e4',
    propertyId: '64c9e4f2df7cc072af2ac9e8',
    content: 'Lorem ipsis'
}

const EXISTING_REVIEW_ID = '64c9e4f2df7cc072af2ac9e4'

export class DataAccess extends ReviewDataAccess{


    constructor(model: ReviewModel){
        super(model)
    }

    public createNew = jest.fn(

        async(input: Review): Promise<HydratedReviewDoc> =>{

            const mockReview =  new this.model(input)
            return mockReview
        }
    )

    public findByReferenceId = jest.fn(

        async(id: string): Promise<HydratedReviewDoc | null> =>{
        if(id === EXISTING_REVIEW_ID)
            return new this.model(REVIEW_DATA)

        return null 
    })
    
    public findByPropertyId = jest.fn(

        async( propertyId: string, paginator: Paginator): Promise<HydratedReviewDoc[]> =>{

            const idOfProductWithReviews = '64c9e4f2df7cc072af2ac9e4'
            let mockReviews: HydratedReviewDoc[] = []
            if(propertyId === idOfProductWithReviews)
                return this.createMockReviewsArray(paginator.limit)

            return mockReviews
        }
    )

    private createMockReviewsArray = (length: number ): HydratedReviewDoc[] =>{

        let count = 0
        const mockReviews: HydratedReviewDoc[] = []
        
        while (count < length){
            mockReviews.push(new this.model(reviewData))
            count++
        }

        return mockReviews
    }

    public findWithPagination = jest.fn(
        async(paginator: Paginator): Promise<HydratedReviewDoc[]> =>{
            return this.createMockReviewsArray(paginator.limit)
        }
    )

    public findOneAndUpdate = jest.fn(
        async({ id, authorId }: SearchDoc, updatedDoc: Object): Promise<HydratedReviewDoc | null> =>{
            if(id === EXISTING_REVIEW_ID)
                return new this.model(REVIEW_DATA)

            return null 
            
    })

    public findOneAndDelete = jest.fn(
        async({ id, authorId }: SearchDoc): Promise<HydratedReviewDoc | null> =>{
            if(id === EXISTING_REVIEW_ID)
                return new this.model(reviewData)

            return null
        }
    )
}