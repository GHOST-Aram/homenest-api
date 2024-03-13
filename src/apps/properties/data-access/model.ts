import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose";

export interface Rental{
    propertyName: string
    propertyType: string

    backgroundImageUrl: string
    rentPerMonth: number
    rentPerYear: number,
    locationName: string
    bedrooms: number
    bathrooms: number
    description: string
    landlord: ObjectId
    squareFootage: number
    isAvailable: boolean
    isFurnished: boolean
    hasParkingSpace: boolean
    energySources: string[]
    waterSources: string[]
    petPolicy: string
    images: string[]
    cityOrTown: string
    estate: string
}

export type RentalModel = Model<Rental>

export const rentalSchema = new Schema<Rental, RentalModel>({
    propertyName: {
        type: String,
        required: true
    },

    propertyType: {
        type: String,
    },

    rentPerMonth: {
        type: Number,
        required: true
    },

    rentPerYear: {
        type: Number,
        required: true
    },

    locationName: {
        type: String,
        required: true
    },

    bedrooms: {
        type: Number,
        required: true
    },

    bathrooms: {
        type: Number,
        require: true
    },

    backgroundImageUrl:{
        type: String,
        required: true
    },

    description: { 
        type: String,
        required: true
    },

    landlord: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    squareFootage:{
        type: Number,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: false
    },

    isFurnished: {
        type: Boolean,
        default: false
    },

    hasParkingSpace: {
        type: Boolean,
        default: false
    },

    energySources: {
        type: [String],
        default: ['KPLC']
    },

    waterSources: {
        type: [String],
        default: ['City Water Company']
    },

    petPolicy: {
        type: String,
        default: 'Allowed with restricted care.'
    },

    cityOrTown:{
        type: String,
        required: true
    },

    estate: {
        type: String,
        required: true
    },
    
    images: [{
        url: String,
        alt: String
    }]


})

export type HydratedRentalDoc = HydratedDocument<Rental>

export const Rental: RentalModel =  model<Rental, RentalModel>(
    'Rental', rentalSchema
)

export  const searchablePaths = [
    'rentPerMonth', 'isAvailable', 'hasParkingSpace',
    'locationName', 'bedrooms', 'propertyName', 'isFurnished',
    'bathrooms', 'cityOrTown', 'estate', 'propertyType'
]