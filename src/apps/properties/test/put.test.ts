import request from "supertest"
import { app } from "./config/app.test.config"
import { describe, test } from "@jest/globals"
import { assert } from "../../../z-library/testing/response-assertion"
import { badRentalData, rentalData } from "./mocks/raw-document"


describe('Rentals PUT', () =>{

    test('Responds with methond not allowed: status 405, Rejects update all', 
        async () =>{
            const response = await request(app).put('/rentals')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Ivalid referenceId', 
        async() => {
            const response = await request(app).put('/rentals/64c9e4f2df7cc0tgd')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid input.', 
        async() =>{
            const response = await request(app).put('/rentals/64c9e4f2df7cc072af2ac9e4')
                .send(badRentalData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with created resource, status 201: New document created.',
        async() =>{
            const response = await request(app).put('/rentals/64c9e4f2df7cc072af2ac9e2')
                .send(rentalData)

            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with updated resource, status 200: Update success', 
        async() =>{
            const response = await request(app).put('/rentals/64c9e4f2df7cc072af2ac9e4')
                .send(rentalData)

            assert.respondsWithSuccess(response)
            assert.respondsWithUpdatedResource(response)
        }
    )
})