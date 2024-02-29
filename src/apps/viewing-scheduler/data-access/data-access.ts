import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { HydratedViewScheduler, ViewScheduler, ViewSchedulerModel } from "./model";
import { Paginator } from "../../../z-library/HTTP/http-response";

export class DataAccess extends GenericDataAccess<ViewSchedulerModel, ViewScheduler>{

    constructor(model: ViewSchedulerModel){
        super(model)
    }

    public findExistingSchedule = async(tenantId: string, propertyId: string
        ): Promise<HydratedViewScheduler | null>  =>{
        return await this.model.findOne({ tenant: tenantId }, { property: propertyId })
    } 

    public findByPropertyId = async( propertyId: string, paginator: Paginator 
        ): Promise<HydratedViewScheduler []> =>{
        return await this.model.find({ property : propertyId })
    }
    
    public findByTenantId = async( tenantId: string, paginator: Paginator 
        ): Promise<HydratedViewScheduler []> =>{
        return await this.model.find({ tenant : tenantId })
    }
}