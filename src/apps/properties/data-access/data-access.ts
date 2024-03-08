import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { HydratedRentalDoc, Rental, RentalModel } from "./model";
import { Types } from  'mongoose'

export class RentalDataAccess extends GenericDataAccess<RentalModel, Rental> {


    constructor(model: RentalModel){
        super(model)
    }

    public findOneAndUpdate = async(searchDoc:SearchDoc, updatedDoc: Object): Promise<HydratedRentalDoc | null> =>{
        return await this.model.findOneAndUpdate({
            agentId:searchDoc.agentId,
            _id: new Types.ObjectId(searchDoc.id)
        }, updatedDoc, { new: true })
    }
}

export type SearchDoc = {
    id: string,
    agentId: string
}