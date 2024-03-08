import { compare, hash } from "bcrypt"
import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface User{
    fullName: string
    role: string
    email: string
    password: string
    isAdmin?: boolean
}

interface UserMethods{
    isValidPassword:(password: string) => Promise<boolean>
}


export type UserModel = Model<User,{}, UserMethods>

export const userSchema = new Schema<User, UserModel, UserMethods,{}>({
    fullName: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    role:{
        type: String,
        enum: ['tenant', 'landlord'],
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 24,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


userSchema.method('isValidPassword', 
    async function(password: string): Promise<boolean>{
        return await compare(password, this.password)
})

userSchema.pre('save', async function(){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
})

export type HydratedUserDoc = HydratedDocument<User, UserMethods >

export const User: UserModel = model<User, UserModel>(
    'User', userSchema)