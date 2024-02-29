import { RentalDataAccess } from "../data-access/data-access";
import { GenericController } from "../../../z-library/bases/generic-controller";

export class RentalsController extends GenericController<RentalDataAccess>{
    constructor (dataAccess: RentalDataAccess){
        super(dataAccess)
    }

    public addNewRental = () =>{ return this.addNew }
    public getOneRental = () =>{ return this.getOne }
    public getManyRentals = () =>{ return this.getMany }
    public updateOneRental = () => { return this.updateOne }
    public modifyOneRental = () => { return this.modifyOne }
    public deleteOneRental = () => { return this.deleteOne }
}