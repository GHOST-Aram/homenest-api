import { Router } from "express";
import { RentalsController } from "../controller/controller";
import { optionalValidator, rentalPostValidator } from "./input-validation";
import { validator } from "../../../z-library/validation/validator";

const router = Router()

export const routesWrapper = (controller: RentalsController) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        rentalPostValidator,
        validator.handleValidationErrors,
        controller.addNewRental()
    )

    router.get('/:id', 
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getOneRental()
    )

    router.get('/', controller.getManyRentals())

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        validator.validateReferenceId('id', { required: true }),
        rentalPostValidator,
        validator.handleValidationErrors,
        controller.updateOneRental()
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        validator.validateReferenceId('id', { required: true }),
        optionalValidator,
        validator.handleValidationErrors,
        controller.modifyOneRental()
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.deleteOneRental()
    )

    
    return router
}