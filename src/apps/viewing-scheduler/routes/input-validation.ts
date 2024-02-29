import { validator } from "../../../z-library/validation/validator"

export const postValidators = [
    validator.validateObjectId('tenant', {required: true}),
    validator.validateObjectId('property', { required: true }),
    validator.validateString('viewDate', { required: true }),
    validator.validateString('viewTime', { required: true })
]

export const patchValidators = [
    validator.validateObjectId('tenant', {required: false}),
    validator.validateObjectId('property', { required: false}),
    validator.validateString('viewDate', { required: false }),
    validator.validateString('viewTime', { required: false })
]