import { DataAccess } from "./data-access";
import { HydratedViewScheduler, ViewScheduler, ViewSchedulerModel } from "./model";
import { postData } from "../test/data/data";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class MockDataAccess extends DataAccess{
    constructor(model: ViewSchedulerModel){
        super(model)
    }

    public createNew = jest.fn(async(data: ViewScheduler
        ): Promise<HydratedViewScheduler>=>{
        return new ViewScheduler(data)
    })  
    
    public findExistingSchedule = jest.fn(async(tenantId: string, propertyId: string ) =>{
        if(tenantId === '64c9e4f2df7cc072af2ac9e0' && 
            propertyId === '64c9e4f2df7cc072af2ac9e0'){
            return new ViewScheduler(postData)
        } 

        else return null
    })

    public findByReferenceId =  jest.fn(async(refId: string
        ): Promise<HydratedViewScheduler| null> =>{
        if(refId === '64c9e4f2df7cc072af2ac9e0')
            return new ViewScheduler(postData)

        return null
    })

    public findWithPagination = jest.fn(async(paginator: Paginator
        ): Promise<HydratedViewScheduler[]> =>{
        return generateFakeDocs(paginator.limit)
    })

    public findByTenantId = jest.fn(
        async( tenantId: string, paginator: Paginator ): Promise<HydratedViewScheduler[]> =>{
            return generateFakeDocs(paginator.limit)
    })

    public findByPropertyId = jest.fn(
        async( propertyId: string, paginator: Paginator ): Promise<HydratedViewScheduler[]> =>{
            return generateFakeDocs(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(assetId: string, updateDoc: ViewScheduler
        ): Promise<HydratedViewScheduler | null> =>{
        if(assetId === '64c9e4f2df7cc072af2ac9e4' )
            return new ViewScheduler(updateDoc)
        return null
    })

    public findByIdAndDelete = jest.fn(async(assetId: string
        ): Promise<HydratedViewScheduler | null> =>{
        if(assetId === '64c9e4f2df7cc072af2ac9e4' )
            return new ViewScheduler(postData)
        return null
    })
}

const generateFakeDocs = (limit: number): HydratedViewScheduler[] =>{
    const docs: HydratedViewScheduler[] = []

    while(limit > 0){
        docs.push(new ViewScheduler(postData))
        limit --
    }

    return docs
}