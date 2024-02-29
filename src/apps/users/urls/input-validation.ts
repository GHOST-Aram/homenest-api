import { validator } from "../../../z-library/validation/validator";

export const userValidators = [
    validator.validateName('first_name', { required: true}),
    validator.validateName('last_name', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true})
]

export const patchValidators = [
    validator.validateName('first_name', { required: false}),
    validator.validateName('last_name', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: true})
]

export {validator}