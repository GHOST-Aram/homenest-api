import { User } from '../../data-access/model'

export const validUserData: User = {
    fullName: 'John Doe',
    role: 'landlord',
    email: 'johndoe@gmail.com',
    password: 'password',
}

export const userWithExistingEmail: User = {
    fullName: 'Existing User',
    role: 'tenant',
    email: 'existingEmail@gmail.com',
    password: 'password',
}

export const invalidUserData = {
    name: 'John doe',
    email: 'johndoe@gmail.com',
    password: 'password',
    role: 'admin'
}

export const validPartialData = {
    fullName: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'password'
}

export const invalidPartialData = {
    email: 'johndoe@gm',
    password: "ee",
    fullName: 90,
    role: 'Hello world'
}