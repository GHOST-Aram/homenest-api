import { DataAccess } from "./data-access";
import { HydratedMessageDoc, Message, MessageModel } from "./model";
import { postData } from "../test/data/data";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class MockDataAccess extends DataAccess{
    constructor(model: MessageModel){
        super(model)
    }
    public createNew = jest.fn(async(data: Message
        ): Promise<HydratedMessageDoc>=>{
        return new Message(data)
    }) 

    public findByReferenceId =  jest.fn(async(refId: string
        ): Promise<HydratedMessageDoc| null> =>{
        if(refId === '64c9e4f2df7cc072af2ac9e0')
            return new Message(postData)

        return null
    })

    public findBySenderId = jest.fn(
        async( senderId: string, paginator: Paginator ): Promise<HydratedMessageDoc[]> =>{
            return generateFakeDocs(paginator.limit)
    })

    public findByRecipientId = jest.fn(
        async( recipientId: string, paginator: Paginator ): Promise<HydratedMessageDoc[]> =>{
            return generateFakeDocs(paginator.limit)
    })

    public findSentMessageAndHide = jest.fn(async(refId: string
        ): Promise<HydratedMessageDoc| null> =>{
        if(refId === '64c9e4f2df7cc072af2ac9e0')
            return new Message(postData)

        return null
    })

    public findReceivedMessageAndHide = jest.fn(async(refId: string
        ): Promise<HydratedMessageDoc| null> =>{
        if(refId === '64c9e4f2df7cc072af2ac9e0')
            return new Message(postData)

        return null
    })
}

const generateFakeDocs = (limit: number): HydratedMessageDoc[] =>{
    const docs: HydratedMessageDoc[] = []

    while(limit > 0){
        docs.push(new Message(postData))
        limit --
    }

    return docs
}