import { HydratedDocument, Model, Schema, model } from "mongoose";

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
    agentId: string
    squareFootage: number
    isAvailable: boolean
    isFurnished: boolean
    hasParkingSpace: boolean
    energySources: string[]
    waterSources: string[]
    petPolicy: string
}

export type RentalModel = Model<Rental>

const rentalSchema = new Schema<Rental, RentalModel>({
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

    agentId: {
        type: String,
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
    }



})

export type HydratedRentalDoc = HydratedDocument<Rental>

export const Rental: RentalModel =  model<Rental, RentalModel>(
    'Rental', rentalSchema
)