import { HydratedRentalDoc } from "../../data-access/model";
import { Rental, RentalModel } from "../../data-access/model";
import { Paginator } from "../../../../z-library/HTTP/http-response";
import { jest } from "@jest/globals";
import { Accessible } from "../../../../z-library/bases/accessible";
import { rentalData } from "./raw-document";
import { SearchDoc } from "../../data-access/data-access";
import { RentLimits } from "../../data-access/data-access";

const AVAILABLE_ID = '64c9e4f2df7cc072af2ac9e4'

export class RentalDataAccess implements Accessible{

    public model: RentalModel

    constructor(model: RentalModel){
        this.model = model
    }

    public createNew = jest.fn(async(data: Rental): Promise<HydratedRentalDoc> =>{
        return new this.model(data)
    })

    public findByLandlordId = jest.fn(async(landlordId: string): Promise<HydratedRentalDoc[]> =>{
        return createFakeRentalDocs(2)
    })
    public findByReferenceId = jest.fn(async(refId: string): Promise<HydratedRentalDoc | null> =>{
        return refId === AVAILABLE_ID ? new this.model(rentalData) : null
    })

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedRentalDoc[]> => {
       return createFakeRentalDocs(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(id: string, updateDoc: any):Promise<HydratedRentalDoc | null> =>{
        return id === AVAILABLE_ID ? new this.model(rentalData) : null
    })

    public findByIdAndDelete = jest.fn(async(id: string): Promise<HydratedRentalDoc | null> =>{
        return id === AVAILABLE_ID ? new this.model(rentalData) : null
    })

    public findOneAndUpdate = jest.fn(async(searchDoc: SearchDoc, updatedDoc: Object): Promise<HydratedRentalDoc | null> =>{
        return searchDoc.id === AVAILABLE_ID ? new this.model(rentalData) : null
    })
    public findOneAndDelete = jest.fn(async(searchDoc: SearchDoc): Promise<HydratedRentalDoc | null> =>{
        return searchDoc.id === AVAILABLE_ID ? new this.model(rentalData) : null
    })

    public findBySearchDocument = jest.fn(async(
        paginator: Paginator,
        { 
            rentLimits, 
            searchDoc 
        }:{ rentLimits: RentLimits | false, searchDoc: Object }
    ): Promise<HydratedRentalDoc[]> =>{

       return createFakeRentalDocs(paginator.limit)
    }
)
}

const createFakeRentalDocs = (limit: number): HydratedRentalDoc[] =>{
    const rentals: HydratedRentalDoc[] = []

    while(limit > 0){
        rentals.push(new Rental(rentalData))
        limit --
    }

    return rentals
}