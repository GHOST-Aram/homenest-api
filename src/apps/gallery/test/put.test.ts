import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { postData, badData } from "./mocks/raw-data";
import { assert } from "../../../z-library/testing/response-assertion";

describe('Gallery PUT Requests', () => {
    test('Responds with Method not allowed, status 405: User defined Ids not allowed', 
        async() =>{
            const response = await request(app).put('/gallery')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Ivalid assetId', 
        async() => {
            const response = await request(app).put('/gallery/64c9e4f2df7cc0tgd')
                .send(postData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid input data.', 
        async() =>{
            const response = await request(app).put('/gallery/64c9e4f2df7cc072af2ac9e4')
                .send(badData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with created resource, status 201: New document created.',
        async() =>{
            const response = await request(app).put('/gallery/64c9e4f2df7cc072af2ac9e2')
                .send(postData)

            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with updated resource, status 200: Update success', 
        async() =>{
            const response = await request(app).put('/gallery/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithSuccess(response)
            assert.respondsWithUpdatedResource(response)
        }
    )
})