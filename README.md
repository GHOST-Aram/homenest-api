# Homenest Project

The homenest project is a project aimed at solving the problem of house hunting. This project aims at connecting tenants to vacant houses. Tenants will be able to use this system to find information about vacant houses without the stress of walking door to door. Landlords will also be able to provide information about vacant houses to propective tenants through this platform.


## Role of the system in making work easier for landlords
This system aims to provide landlords with the ability to post the following details on their properties.

- Property name
- Property type
- Location
- Rent charges
- Available amenities
- etc
## Role of the system in making work easier for tenants
The Homenest system will provide a listing of available properties with search functionalities to allow tenants to find houses easily.


The system comprises of the following components

## 1. Authenticator.
Provides authentication and authorization service to all users of the system. The authentication service uses JSON web tokens. See the [documentation](./docs/authentication/auth.md) for more details on how it works.

## 2. Gallery
This component manages all the images uploaded by a tenant for a specific property

## 3. Messenger
A simple internal messaging app for connecting landlords to propesctive tenants

## 4. Properties
Properties component manages all the information about properties listed on the platform.

## 5. Rental applications
This component manages applications from tenants on specific properties that they are interested in.

## 6. Reviews
Reviews component manages reviews from tenants about their experiences on the places they have lived in. These reviews will be available under the properties that users commented on. See [documentation](./docs/reviews/)

## 7. Users
Users component manages all user data including tenants, landlords and admins. See [documentation](./docs/users/)

## 8. Viewing Scheduler
Viewing scheduler component enables users to schedule the time and day that they wish to visit the properties in person.
