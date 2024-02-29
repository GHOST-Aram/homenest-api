import { validator } from "../../../z-library/validation/validator";

export const postValidators = [
    validator.validateObjectId('sender', { required: true }),
    validator.validateObjectId('recipient', { required: true }),
    validator.validateString('content', { required: true })
]