import { Response, Request } from "express"
import { HydratedDocument } from "mongoose"

export class HttpResponse{

    public microserviceName: string

    constructor(microserviceName: string){
        this.microserviceName = microserviceName
    }

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json('Method not allowed' )
    }

    public respondWithConflict = (res: Response) =>{
        res.status(409).json('Document already exists')
    }

    public respondWithCreatedResource = (resource: HydratedDocument<any>, res: Response) =>{
        res.location(`/${this.microserviceName}/${resource.id}`)
        res.status(201).json({message: 'Created', item: resource})
    }

    public respondWithFoundResource = (
        resource: HydratedDocument<any>[]| HydratedDocument<any>, 
        res: Response
        ) =>{
            res.status(200).json(resource)
    }

    public paginate = (req: Request): Paginator =>{
        const paginator = {
            skipDocs: 0,
            limit: 10
        }

        const page = Math.abs(Number(req.query.page))
        const limit = Math.abs(Number(req.query.limit))

        if(page && limit){
            paginator.skipDocs = (page - 1) * limit
            paginator.limit = limit
        }

        return paginator
    }

    public respondWithNotFound = (res: Response) =>{
        res.status(404).json('Not Found')
    }

    public respondWithModifiedResource = (resourceId: string, res: Response) =>{
        res.location(`/${this.microserviceName}/${resourceId}`)
        res.status(200).json( 'Modified' )
    } 

    public respondWithUpdatedResource = (resourceId: string, res: Response) =>{
        res.location(`/${this.microserviceName}/${resourceId}`)
        res.status(200).json('Updated' )
    }

    public respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({ message: 'Deleted',id })
    }

    public respondWithForbidden = (res: Response) =>{
        res.status(403).json({ message: 'Forbidden' })
    }

    public respondWithUnauthorised = (res: Response) =>{
        res.status(401).json('Unauthorised' )
    }

    public respondWithToken = (token: string, res: Response) =>{
        res.status(200).json({ token })
    }
}

export interface Paginator{
    skipDocs: number,
    limit: number
}