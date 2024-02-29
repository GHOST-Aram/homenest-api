import { DataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";
import { Response, Request, NextFunction } from "express";
export class Controller extends GenericController<DataAccess>{
    constructor(dataAccess: DataAccess){
        super(dataAccess)
    }

    public  getBySenderId = async(req: Request, res: Response, next: NextFunction) =>{
        const sender = req.params.id
        const pagination = this.paginate(req)

        try{
            const messages =  await this.dataAccess.findBySenderId(sender, pagination)

            this.respondWithFoundResource(messages, res)
        } catch (error) {
            next(error)
        }
    }

    public  getByRecipientId = async(req: Request, res: Response, next: NextFunction) =>{
        const sender = req.params.id
        const pagination = this.paginate(req)

        try{
            const messages =  await this.dataAccess.findByRecipientId(sender, pagination)

            this.respondWithFoundResource(messages, res)
        } catch (error) {
            next(error)
        }
    }

    public hideMessageFromSender = async(req: Request, res: Response, next: NextFunction) =>{
        const messageId = req.params.id

        try {
            const hiddenMessage = await this.dataAccess.findSentMessageAndHide(messageId)

            if(hiddenMessage){
                this.respondWithDeletedResource(hiddenMessage.id, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            
        }
    }

    public hideMessageFromReceiver = async(req: Request, res: Response, next: NextFunction) =>{
        const messageId = req.params.id

        try {
            const hiddenMessage = await this.dataAccess.findReceivedMessageAndHide(messageId)

            if(hiddenMessage){
                res.status(200).json({id: hiddenMessage.id})
            } else {
                res.status(404).json('Not found')
            }
        } catch (error) {
            
        }
    }
}