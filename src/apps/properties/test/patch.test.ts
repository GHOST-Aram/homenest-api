import { app } from "./config/app.test.config";
import request from "supertest"
import { describe, test } from "@jest/globals";
import { assert } from "../../../z-library/testing/response-assertion";
import { badRentalData, patchData } from "./mocks/raw-document";


describe('Rentals PATCH routes', () =>{
    
    test('Responds with method not allowed',
        async() =>{
            const response = await request(app).patch('/rentals')
    
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Ivalid referenceId', 
        async() => {
            const response = await request(app).patch('/rentals/64c9e4f2df7cc0tgd')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid input.', 
        async() =>{
            const response = await request(app).patch('/rentals/64c9e4f2df7cc072af2ac9e4')
                .send(badRentalData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found, status 404: Target does not exist', 
        async() => {
            const response = await request(app).patch('/rentals/64c9e4f2df7cc072af2ac9e8')
                .send(patchData)

            assert.respondsWithNotFound(response)
        }
    )

    test('Responds wiht modified resource, status 200: Pacth success',
        async() =>{
            const response = await request(app).patch('/rentals/64c9e4f2df7cc072af2ac9e4')
                .send(patchData)

            assert.respondsWithSuccess(response)
            assert.respondsWithModifedResource(response)
        }
    )
})