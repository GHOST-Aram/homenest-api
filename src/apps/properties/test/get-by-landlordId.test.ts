import request from "supertest"
import { describe, test } from "@jest/globals"
import { app } from "./config/app.test.config"
import { assert } from "../../../z-library/testing/response-assertion"

describe('GET Many rentals by landlord Id', () =>{

    test('Responds with found items, status 200', 
        async() =>{
            const response = await request(app).get('/rentals/landlords/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithSuccess(response)
            assert.respondsWithItemsArray(response)
        }
    )

    test('Responds with validation errors, status 400: Ivalid referenceId', 
    async() => {
        const response = await request(app).get('/rentals/landlords/64c9e4f2df7cc0tgd')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    }
)
})