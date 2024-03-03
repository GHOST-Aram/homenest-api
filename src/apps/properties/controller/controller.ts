import { RentalDataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";

export class RentalsController extends GenericController<RentalDataAccess>{
    constructor (dataAccess: RentalDataAccess, microserviceName: string){
        super(dataAccess, microserviceName)
    }
}