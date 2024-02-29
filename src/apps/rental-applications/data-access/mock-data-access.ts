import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { 
        ApplicationSubmission, 
        ApplicationSubmissionModel,
        HydratedApplicationSub
} from "./model";
import { postData } from "../test/data/data";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class DataAccess extends GenericDataAccess
<ApplicationSubmissionModel, ApplicationSubmission>{
    constructor(model: ApplicationSubmissionModel){
        super(model)
    }

    public createNew = jest.fn(async(data: ApplicationSubmission
        ): Promise<HydratedApplicationSub>=>{
        return new ApplicationSubmission(data)
    })

    public findExistingApplication = jest.fn(async(tenantId: string, propertyId: string ) =>{
        if(tenantId === '64c9e4f2df7cc072af2ac9e0' && propertyId === '64c9e4f2df7cc072af2ac9e0'){
            return new ApplicationSubmission(postData)
        } 

        else return null
    })
    public findByReferenceId =  jest.fn(async(refId: string
        ): Promise<HydratedApplicationSub| null> =>{
        if(refId === '64c9e4f2df7cc072af2ac9e0')
            return new ApplicationSubmission(postData)

        return null
    })

    public findByTenantId = jest.fn(
        async( tenantId: string, paginator: Paginator ): Promise<HydratedApplicationSub[]> =>{
            return generateFakeDocs(paginator.limit)
    })

    public findByPropertyId = jest.fn(
        async( propertyId: string, paginator: Paginator ): Promise<HydratedApplicationSub[]> =>{
            return generateFakeDocs(paginator.limit)
    })

    public findWithPagination = jest.fn(async(paginator: Paginator
        ): Promise<HydratedApplicationSub[]> =>{
        return generateFakeDocs(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(assetId: string, updateDoc: ApplicationSubmission
        ): Promise<HydratedApplicationSub | null> =>{
        if(assetId === '64c9e4f2df7cc072af2ac9e4' )
            return new ApplicationSubmission(updateDoc)
        return null
    })

    public findByIdAndDelete = jest.fn(async(assetId: string
        ): Promise<HydratedApplicationSub | null> =>{
        if(assetId === '64c9e4f2df7cc072af2ac9e4' )
            return new ApplicationSubmission(postData)
        return null
    })
}

const generateFakeDocs = (limit: number): HydratedApplicationSub[] =>{
    const docs: HydratedApplicationSub[] = []

    while(limit > 0){
        docs.push(new ApplicationSubmission(postData))
        limit --
    }

    return docs
}
