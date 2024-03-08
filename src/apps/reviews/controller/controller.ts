import { NextFunction, Request, Response } from "express"
import { ReviewDataAccess } from "../data-access/data-access"
import { HydratedReviewDoc } from "../data-access/model"
import { GenericController } from "../../../z-library/bases/generic-controller"

export class ReviewsController extends GenericController<ReviewDataAccess>{

    constructor(dataAccess: ReviewDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const inputData = req.body
        const currentUser:any = req.user

        try {
            const newDocument = await this.dataAccess.createNew({...inputData, 
                authorId: currentUser._id.toString() })

                console.log("New document: ", newDocument)
            this.respondWithCreatedResource(newDocument, res)
        } catch (error) {
            next(error)
        }  
    }

    //Get reviews for a specific products
    public getProductReviews = async(req: Request, res: Response, next: NextFunction) =>{

        const productId = req.params.id

        const paginator = this.paginate(req)
        try {
            const reviewDocs = await this.dataAccess
                .findByPropertyId(productId, paginator)

            this.respondWithFoundResource(reviewDocs, res)
        } catch (error) {
            next(error)
        }
    }


    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const reviewId = req.params.reviewId
        const content: string = req.body.content
        const currentUser:any = req.user

        try {
            const modifiedReview = await this.dataAccess.findOneAndUpdate({
                id: reviewId, authorId: currentUser._id.toString()},
                { content }
            )
            
            if(modifiedReview){
                this.respondWithModifiedResource(modifiedReview, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }

    }

    private handleForbiddenRequest = (
        toBeModified: HydratedReviewDoc, currentUser:any, res: Response) =>{
        const authorIsCurrentUser = toBeModified.authorId.toString() === 
            currentUser._id.toString()
                
        if(!authorIsCurrentUser)
            this.respondWithForbidden(res, 'You cannot change a review created by other users.')
        else
            return
    }


    public deleteOne = async (req: Request, res: Response, next: NextFunction) =>{
        const currentUser:any = req.user
        const reviewId = req.params.reviewId
        
        try {
            const deletedReview = await this.dataAccess.findOneAndDelete({
                id: reviewId, authorId: currentUser._id.toString()
            })

            if(deletedReview){
                this.respondWithDeletedResource(deletedReview.id, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }    
    }

    private handleDeletion = async(reviewId: string, res: Response) =>{
        const deletedReview = await this.dataAccess.findByIdAndDelete(
            reviewId)
        if(deletedReview)
            this.respondWithDeletedResource( deletedReview.id, res)
    }
}