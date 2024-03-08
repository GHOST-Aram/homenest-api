import { validator } from "../../../z-library/validation/validator";

export const newReviewInputValidators = [
    validator.validateString('content', { required: true }),
    validator.validateObjectId('propertyId', { required: true })
]

export const patchInputValidators = [
    validator.validateString('content', { required: true }), 
]