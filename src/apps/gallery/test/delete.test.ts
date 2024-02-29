import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { assert } from "../../../z-library/testing/response-assertion";

describe('DELETE Gallery', () => {
    test('Responds with method not allowed, status 405: Rejects delete all',
        async() =>{
            const response = await request(app).delete('/gallery')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Ivalid assetId', 
        async() => {
            const response = await request(app).delete('/gallery/64c9e4f2df7cc0tgd')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with the deleted resource, status 200: Delete success',
        async() =>{
            const response = await request(app).delete('/gallery/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithSuccess(response)
            assert.respondsWithDeletedResource(response)
        }
    )

    test('Responds with Not Found, status 404: Target does not exist', 
        async() => {
            const response = await request(app).delete('/gallery/64c9e4f2df7cc072af2ac9e8')

            assert.respondsWithNotFound(response)
        }
    )
})