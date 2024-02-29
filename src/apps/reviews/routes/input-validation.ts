import { validator } from "../../../z-library/validation/validator";

export const newReviewInputValidators = [
    validator.validateObjectId('author', { required: true}),
    validator.validateString('content', { required: true }),
    validator.validateObjectId('product', { required: true })
]

export const patchInputValidators = [
    validator.validateString('content', { required: true }), 
]