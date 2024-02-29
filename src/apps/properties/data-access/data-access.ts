import { GenericDataAccess } from "../../../z-library/bases/generic-data-access";
import { Rental, RentalModel } from "./model";

export class RentalDataAccess extends GenericDataAccess<RentalModel, Rental> {


    constructor(model: RentalModel){
        super(model)
    }

}