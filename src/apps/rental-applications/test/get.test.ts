import { describe } from "@jest/globals";
import { app } from "./config/test.config";
import { assert } from "../../../z-library/testing/response-assertion";
import request from "supertest"

describe('Submissions | GET One by submission Id', () => {
    //Get by assetId

    test('Responds with validation errors, status 400: Invalid assetId id', 
        async() => {
            const response = await request(app).get('/application-submission/jjjthew843')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found, status 404: Target not found', 
            async() =>{
                const response = await request(app).get('/application-submission/64c9e4f2df7cc072af2ac9e8')

                assert.respondsWithNotFound(response)
        }
    )

    test('Responds with found resource, status 200: GET success', 
        async() => {
            const response = await request(app).get('/application-submission/64c9e4f2df7cc072af2ac9e0')

            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )

})