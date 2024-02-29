import request from "supertest"
import { app } from "./config/app.test.config"
import { describe, test } from "@jest/globals"
import { assert } from "../../../z-library/testing/response-assertion"
import { rentalProperties } from "./mocks/raw-document"



describe('Rentals GET routes', () =>{
    test('Responds with validation errors, status 400: Ivalid referenceId', 
        async() => {
            const response = await request(app).get('/rentals/64c9e4f2df7cc0tgd')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with not found, status 404: Document does not exist',
        async() =>{
            const response = await request(app).get('/rentals/64c9e4f2df7cc072af2ac9e8')

            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with found item, status 200: Request success', 
        async() => {
            const response = await request(app).get('/rentals/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )

    test('Responds with all rental data propertiEs', 
        async() =>{
            const response = await request(app).get('/rentals/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithAllDataProperties(rentalProperties, response)
        }
    )
})