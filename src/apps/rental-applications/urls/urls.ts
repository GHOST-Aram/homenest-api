import { Router } from "express";
import { Controller } from "../controllers/controller";
import { pacthValidators, postValidators, validator } from "./input-validation";


const router = Router()
export const routesWrapper = (controller: Controller): Router =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed),
    router.post('/', postValidators, 
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/:id', validator.validateReferenceId('id', { required: true }), 
        validator.handleValidationErrors,
        controller.getOne
    )

    router.get('/', controller.getMany)
    router.get('/tenant/:id', validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getByTenantId
    )

    router.get('/property/:id', validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getByPropertyId
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', validator.validateReferenceId('id', { required: true }),
        postValidators,
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', validator.validateReferenceId('id', { required: true }),
        pacthValidators,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.deleteOne
    )
    return router
}