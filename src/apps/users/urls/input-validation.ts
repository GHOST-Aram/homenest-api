import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class UserValidator extends Validator{
    public validateRole  = (): ValidationChain =>{
        return this.validateString('role', { required: true }).custom((value: string) =>{
            return value === 'tenant' || value === 'landlord'
        }).withMessage('role must be either \'tenant\' or \'landlord\'')
    }
}

const validator = new UserValidator()

export const userValidators = [
    validator.validateRole(),
    validator.validateName('fullName', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true}),
    validator.validateBooleanField('isAdmin', { required: false})
]

export const patchValidators = [
    validator.validateRole(),
    validator.validateName('fullName', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: false})
]

export {validator}