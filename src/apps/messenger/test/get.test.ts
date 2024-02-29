import { describe } from "@jest/globals";
import { app } from "./config/test.config";
import { assert } from "../../../z-library/testing/response-assertion";
import request from "supertest"

describe('Messenger | GET by Message Id', () => {
    //Get by assetId
    test('Responds with method not allowed, status 405: Reject Get all' ,
        async() =>{
            const response = await request(app).get('/messages')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid id', 
        async() => {
            const response = await request(app).get('/messages/jjjthew843')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found, status 404: Target not found', 
            async() =>{
                const response = await request(app).get('/messages/64c9e4f2df7cc072af2ac9e8')

                assert.respondsWithNotFound(response)
        }
    )

    test('Responds with found resource, status 200: GET success', 
        async() => {
            const response = await request(app).get('/messages/64c9e4f2df7cc072af2ac9e0')

            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )

})