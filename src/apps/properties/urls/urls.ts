import { Router } from "express";
import { RentalsController } from "../controller/controller";
import { optionalValidator, rentalPostValidator } from "./input-validation";
import { validator } from "../../../z-library/validation/validator";
import { Authenticatable } from '../../../z-library/auth/auth'

const router = Router()

export const routesWrapper = (controller: RentalsController, authenticator: Authenticatable) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        authenticator.authenticate(),
        rentalPostValidator,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/:id', 
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.get('/', controller.getMany)

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id', { required: true }),
        rentalPostValidator,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id', { required: true }),
        optionalValidator,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    
    return router
}