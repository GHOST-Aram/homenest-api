import { validator } from "../../../z-library/validation/validator";

const required = { required: true }
const notRequired = { required: false }

const validatePostInput = [
    validator.validateObjectId('assetId', required),
    validator.validateUrl('exterior1', required),
    validator.validateUrl('exterior2', notRequired),
    validator.validateUrl('exterior3', notRequired),
    validator.validateUrl('exterior4', notRequired),
    validator.validateUrl('interior1', notRequired),
    validator.validateUrl('interior2', notRequired),
    validator.validateUrl('interior3', notRequired),
    validator.validateUrl('interior4', notRequired),
]

const validatePatchInput = [
    validator.validateObjectId('assetId', notRequired),
    validator.validateUrl('exterior1', notRequired),
    validator.validateUrl('exterior2', notRequired),
    validator.validateUrl('exterior3', notRequired),
    validator.validateUrl('exterior4', notRequired),
    validator.validateUrl('interior1', notRequired),
    validator.validateUrl('interior2', notRequired),
    validator.validateUrl('interior3', notRequired),
    validator.validateUrl('interior4', notRequired),
]

export { validatePostInput, validatePatchInput }