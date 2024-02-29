import { validator } from "../../../z-library/validation/validator"


const required = { required: true }
const notRequired = { required: false }

const rentalPostValidator = [
    validator.validateName('propertyName', required),
    validator.validateNumber('bedrooms', required),
    validator.validateUrl('backgroundImageUrl', required),
    validator.validateString('description', required),
    validator.validateObjectId('agentId', required),
    validator.validateName('locationName', required),
    validator.validateNumber('rentPerMonth', required),
    validator.validateNumber('rentPerYear', required),
    validator.validateNumber('bathrooms', required),
    validator.validateNumber('squareFootage', required),
]

const optionalValidator = [
    validator.validateName('propertyName', notRequired),
    validator.validateName('locationName', notRequired),
    validator.validateNumber('bedrooms', notRequired),
    validator.validateNumber('price', notRequired),
    validator.validateUrl('backgroundImageUrl', notRequired),
    validator.validateString('description', notRequired),
    validator.validateObjectId('agentId', notRequired),
    validator.validateNumber('rentPerMonth', notRequired),
    validator.validateNumber('rentPerYear', notRequired),
    validator.validateNumber('bathrooms', notRequired),
    validator.validateNumber('squareFootage', notRequired),
]

export { rentalPostValidator, optionalValidator }