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

        if(currentUser){
            try {
                const newDocument = await this.dataAccess.createNew({...inputData, 
                    authorId: currentUser._id.toString() })

                    console.log("New document: ", newDocument)
                this.respondWithCreatedResource(newDocument, res)
            } catch (error) {
                next(error)
            }   
        } else {
            this.respondWithUnauthorised(res, 'Login to create a review.')
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

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        //A Once a review is posted, it cannot be updated fully but it can be
        //modifed partially
        this.respondWithMethodNotAllowed(req, res)
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){

            const reviewId = req.params.reviewId
            const content: string = req.body.content
    
            try {
                const toBeModified = await this.dataAccess.findByReferenceId(reviewId)
               
                if(toBeModified === null)
                    this.respondWithNotFound(res)
                else {
                    this.handleForbiddenRequest(toBeModified, currentUser, res)
                }
                //Allow users to modify only the reviews that they authored   
                await this.handleUpdate(reviewId, { content }, res) 
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
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

    private handleUpdate = async(updateId: string, updateDoc:any, res: Response) =>{
        const updatedReview = await this.dataAccess.findByIdAndUpdate(
            updateId, updateDoc)

        if(updatedReview !== null)
            this.respondWithModifiedResource(updatedReview, res)    
        else
            this.respondWithNotFound(res)
    }

    public deleteOne = async (req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated() && currentUser.isAdmin){

            const reviewId = req.params.reviewId
            
            try {
                const toBeDeleted = await this.dataAccess.findByReferenceId(reviewId)

                if(toBeDeleted){
                    this.handleForbiddenRequest(toBeDeleted, currentUser, res)
                    this.handleDeletion(reviewId, res)
                } else {
                    this.respondWithNotFound(res)
                }
            } catch (error) {
                next(error)
            }    
        } else{
            this.respondWithForbidden(res)
        }
    }

    private handleDeletion = async(reviewId: string, res: Response) =>{
        const deletedReview = await this.dataAccess.findByIdAndDelete(
            reviewId)
        if(deletedReview)
            this.respondWithDeletedResource( deletedReview.id, res)
    }
}