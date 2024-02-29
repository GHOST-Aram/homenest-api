import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { badData, postData } from "./mocks/raw-data";
import { assert } from "../../../z-library/testing/response-assertion";

describe('Gallery POST', () => {
    test('Responds with method not allowed, status 405: Reject batch post request' ,
        async() =>{
            const response = await request(app).post('/gallery/64c9e4f2df7cc072af2ac9e4')
                .send( postData )
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with conflict, status 409: Gallery exists with the provided AssetId',
        async() =>{
            const response = await request(app).post('/gallery')
                .send({...postData, assetId: '64c9e4f2df7cc072af2ac9e0'})

            assert.respondsWithConflict(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid Input', 
    
        async() =>{
            const response = await request(app).post('/gallery')
            .send( badData )

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Created resource, status 201: POST request success', 
        async() => {
            const response = await request(app).post('/gallery')
            .send( postData )

            assert.respondsWithCreatedResource(response)
        }
    )

})