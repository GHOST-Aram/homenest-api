import mongoose from "mongoose"
export const postData = {
    tenant: new mongoose.mongo.ObjectId(),
    propertyApplied: new mongoose.mongo.ObjectId(),
    identityNo : 32639434 ,
    employmentStatus: 'employed',
    maritalStatus: 'not married',
    numberOfOccupants: 3,
    occupation: 'Software Developer'    
}
export const invalidData = {
    propertyApplied: new mongoose.mongo.ObjectId(),
    identityNo : '326343redwaw' ,
    maritalStatus: 'not married',
    numberOfOccupants: 3,
}

export const patchData = {
    identityNo : 32639434 ,
    employmentStatus: 'employed',
    maritalStatus: 'not married',
    numberOfOccupants: 3,
    occupation: 'Software Developer'    
}
