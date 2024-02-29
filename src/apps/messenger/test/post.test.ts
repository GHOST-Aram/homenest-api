import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { postData, invalidData } from "./data/data";
import { assert } from "../../../z-library/testing/response-assertion";

describe('Messenger POST', () => {
    test('Responds with method not allowed, status 405: Reject batch post request' ,
        async() =>{
            const response = await request(app).post(
                '/messages/64c9e4f2df7cc072af2ac9e4')
                .send( postData )
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid Input', 
    
        async() =>{
            const response = await request(app).post('/messages')
            .send( invalidData )

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Created resource, status 201: POST request success', 
        async() => {
            const response = await request(app).post('/messages')
            .send( postData )


            assert.respondsWithCreatedResource(response)
        }
    )
})