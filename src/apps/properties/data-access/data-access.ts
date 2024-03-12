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
}

export type SearchDoc = {
    id: string,
    landlord: string
}