import { Paginator } from "../../../z-library/HTTP/http-response";
import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { HydratedRentalDoc, Rental, RentalModel } from "./model";
import { Types } from  'mongoose'

export class RentalDataAccess extends GenericDataAccess<RentalModel, Rental> {


    constructor(model: RentalModel){
        super(model)
    }

    public findByLandlordId = async(landlordId: string): Promise<HydratedRentalDoc[]> =>{
        return await this.model.find({ landlord: landlordId })
    }

    public findOneAndUpdate = async(searchDoc:SearchDoc, updatedDoc: Object): Promise<HydratedRentalDoc | null> =>{
        return await this.model.findOneAndUpdate({
            landlord:searchDoc.landlord,
            _id: new Types.ObjectId(searchDoc.id)
        }, updatedDoc, { new: true })
    }

    public findOneAndDelete = async(searchDoc:SearchDoc ): Promise<HydratedRentalDoc | null> =>{
        return await this.model.findOneAndDelete({
            landlord:searchDoc.landlord,
            _id: new Types.ObjectId(searchDoc.id)
        })
    }

    public findBySearchDocument = async(
        paginator: Paginator,
        { rentLimits, searchDoc }:{ rentLimits: RentLimits | false, searchDoc: Object }
    ): Promise<HydratedRentalDoc[]> =>{
        if(rentLimits)
            return await this.model.find( {
                rentPerMonth: { $lt: rentLimits.rentMax, $gt: rentLimits.rentMin }
                , ...searchDoc 
            }).skip(paginator.skipDocs).limit(paginator.limit)
        else
            return await this.model.find(searchDoc)
                .skip(paginator.skipDocs)
                .limit(paginator.limit)
    }
}

interface RentLimits{
    rentMin: number
    rentMax: number
}

export type SearchDoc = {
    id: string,
    landlord: string
}