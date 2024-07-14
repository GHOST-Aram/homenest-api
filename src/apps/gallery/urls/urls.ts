import { Router } from "express"
import { Controller } from "../controllers/controller"
import { validateFiles, validateFilesAsOptional, validateImageIds } from "./inputValidators"
import { validator } from "../../../z-library/validation/validator"
import { uploadMultipleFiles } from "../../../z-library/uploads/upload"

const router = Router()

export const routesWrapper = (controller: Controller) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/',
        uploadMultipleFiles('images'),
        validator.validateObjectId('assetId', { required: true }),
        validator.handleValidationErrors,
        validateFiles,
        controller.addNew
    )

    router.get('/:assetId', 
        validator.validateReferenceId('assetId', { required: true }),
        validator.handleValidationErrors,
        controller.getOne
    )
    router.get('/', controller.respondWithMethodNotAllowed)
    
    //PUT not allowed, only patching is allowed
    router.put('/',controller.respondWithMethodNotAllowed)
    router.put('/:assetId',controller.respondWithMethodNotAllowed)

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:assetId', 
        uploadMultipleFiles('images'),
        validateFilesAsOptional,
        validateImageIds,
        validator.validateReferenceId('assetId', { required: true}),//validate url param
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:assetId', 
        validator.validateReferenceId('assetId', { required: true}),//validate url param
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}