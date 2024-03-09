import { validator } from "../../../z-library/validation/validator"


const required = { required: true }
const optional = { required: false }

const rentalPostValidator = [
    validator.validateName('propertyName', required),
    validator.validateNumber('bedrooms', required),
    validator.validateUrl('backgroundImageUrl', required),
    validator.validateString('description', required),
    validator.validateObjectId('landlord', required),
    validator.validateName('locationName', required),
    validator.validateNumber('rentPerMonth', required),
    validator.validateNumber('rentPerYear', required),
    validator.validateNumber('bathrooms', required),
    validator.validateNumber('squareFootage', required),
]

const optionalValidator = [
    validator.validateName('propertyName', optional),
    validator.validateName('locationName', optional),
    validator.validateNumber('bedrooms', optional),
    validator.validateNumber('price', optional),
    validator.validateUrl('backgroundImageUrl', optional),
    validator.validateString('description', optional),
    validator.validateObjectId('landlord', optional),
    validator.validateNumber('rentPerMonth', optional),
    validator.validateNumber('rentPerYear', optional),
    validator.validateNumber('bathrooms', optional),
    validator.validateNumber('squareFootage', optional),
]

export { rentalPostValidator, optionalValidator }