import { Paginator } from "../../../z-library/HTTP/http-response";
import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { ApplicationSubmission, ApplicationSubmissionModel, HydratedApplicationSub } from "./model";

export class DataAccess extends GenericDataAccess<ApplicationSubmissionModel, ApplicationSubmission>{
    constructor(model: ApplicationSubmissionModel){
        super(model)
    }

    public findExistingApplication = async(tenantId: string, propertyId: string
        ): Promise<HydratedApplicationSub | null>  =>{
        return await this.model.findOne({ tenant: tenantId }, { propertyApplied: propertyId })
    }   

    public findByTenantId = async( tenantId: string, paginator: Paginator 
        ): Promise<HydratedApplicationSub []> =>{
        return await this.model.find({ tenant : tenantId })
    }
    public findByPropertyId = async( propertyId: string, paginator: Paginator 
        ): Promise<HydratedApplicationSub []> =>{
        return await this.model.find({ property : propertyId })
    }
}