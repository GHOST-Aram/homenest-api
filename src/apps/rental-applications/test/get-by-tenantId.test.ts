import { describe } from "@jest/globals";
import { app } from "./config/test.config";
import { assert } from "../../../z-library/testing/response-assertion";
import request from "supertest"

describe('GET Many By tenant', () =>{
    test('Responds with validation errors, status 400: Invalid tenant id', 
        async() => {
            const response = await request(app).get(
                '/application-submission/tenant/jjjthew843')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with paginated data, status 200: (Default pagination = 10)', 
        async() =>{
            const response = await request(app).get(
                '/application-submission/tenant/64c9e4f2df7cc072af2ac9e8')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )
    
    test('Responds with paginated data, status 200: (User defined pagination = 21', 
        async() =>{
            const response = await request(app).get(
                '/application-submission/tenant/64c9e4f2df7cc072af2ac9e8?page=1&&limit=21')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 21)
        }
    )
})