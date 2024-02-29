import { Router } from "express";
import { Controller } from "../controllers/controller";
import { postValidators } from "./input-validation";
import { validator } from "../../../z-library/validation/validator";

const router = Router()

export const routesWrapper = (controller: Controller): Router =>{
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', postValidators, validator.handleValidationErrors,
        controller.addNew
    )

    
    router.get('/', controller.respondWithMethodNotAllowed)
    
    router.get('/sender/:id', validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getBySenderId
    )
    router.get('/recipient/:id', validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getByRecipientId
    )
    router.get('/:id', validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/sender/:id', controller.respondWithMethodNotAllowed)
    router.put('/recipient/:id', controller.respondWithMethodNotAllowed)
    router.put('/:id', controller.respondWithMethodNotAllowed)
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/sender/:id', controller.respondWithMethodNotAllowed)
    router.patch('/recipient/:id', controller.respondWithMethodNotAllowed)
    router.patch('/:id', controller.respondWithMethodNotAllowed)
    
    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/sender/:id', controller.respondWithMethodNotAllowed)
    router.delete('/recipient/:id', controller.respondWithMethodNotAllowed)
    router.delete('/sent', controller.respondWithMethodNotAllowed)
    router.delete('/sent/:id', 
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.hideMessageFromSender
    )
    router.delete('/received', controller.respondWithMethodNotAllowed)
    router.delete('/received/:id', 
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.hideMessageFromReceiver
    )

    router.delete('/:id', controller.respondWithMethodNotAllowed)
    
    return router
}