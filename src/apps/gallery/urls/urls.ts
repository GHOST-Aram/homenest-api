import { Router } from "express"
import { Controller } from "../controllers/controller"
import { validatePatchInput, validatePostInput } from "./inputValidators"
import { validator } from "../../../z-library/validation/validator"

const router = Router()

export const routesWrapper = (controller: Controller) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', validatePostInput,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/:assetId', 
        validator.validateReferenceId('assetId', { required: true }),
        validator.handleValidationErrors,
        controller.getOne
    )
    router.get('/', controller.getMany)

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:assetId', validator.validateReferenceId('assetId', { required: true}),
        validatePostInput,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:assetId', validator.validateReferenceId('assetId', { required: true}),
        validatePatchInput,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:assetId', validator.validateReferenceId('assetId', { required: true}),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}