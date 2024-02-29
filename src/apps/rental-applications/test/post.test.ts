import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { postData, invalidData } from "./data/data";
import { assert } from "../../../z-library/testing/response-assertion";

describe('Rental Submissions POST', () => {
    test('Responds with method not allowed, status 405: Reject batch post request' ,
        async() =>{
            const response = await request(app).post('/application-submission/64c9e4f2df7cc072af2ac9e4')
                .send( postData )
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid Input', 
    
        async() =>{
            const response = await request(app).post('/application-submission')
            .send( invalidData )

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Created resource, status 201: POST request success', 
        async() => {
            const response = await request(app).post('/application-submission')
            .send( postData )

            console.log(response.body)
            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with conflict, status 409: Application exists with the provided AssetId',
        //Ensure that a tenant does not apply for the same property twice
        async() =>{
            const response = await request(app).post('/application-submission')
                .send({...postData, 
                    propertyApplied: '64c9e4f2df7cc072af2ac9e0', 
                    tenant: '64c9e4f2df7cc072af2ac9e0'
                })

            assert.respondsWithConflict(response)
        }
    )
})