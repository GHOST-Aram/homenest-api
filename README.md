# Homenest Project

The homenest project is a project aimed at solving the problem of house hunting. This project is a backend API for a system aimed at connecting tenants to landlords with vacant houses.


The system comprises of the following components


## 1. Users
Users component manages all user data including tenants, landlords and admins. See [documentation](./docs/users/users.md)

## 2. Authenticator.
Provides authentication and authorization service to all users of the system. The authentication service uses JSON web tokens. See the [documentation](./docs/authentication/auth.md) for more details on how it works.

## 3. Properties
Properties component manages all the information about properties listed on the platform. [See documentation](./docs/properties/properties.md)

## 4. Reviews
Reviews component manages reviews from tenants about their experiences on the places they have lived in. These reviews will be available under the properties that users commented on. See [documentation](./docs/reviews/reviews.md)

## 5. Gallery
This component manages all the images uploaded by a tenant for a specific property

## 6. Messenger
A simple internal messaging app for connecting landlords to propesctive tenants


## 7. Rental applications
This component manages applications from tenants on specific properties that they are interested in.

## 8. Viewing Scheduler
Viewing scheduler component enables users to schedule the time and day that they wish to visit the properties in person.
