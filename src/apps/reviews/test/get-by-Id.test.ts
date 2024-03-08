import { assert} from "../../../z-library/testing/response-assertion";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from 'supertest'

describe('GET reviews Route', () =>{

    test('Responds with validationErrors (status 400): If referenceId is Invalid.',  
        async() =>{
            const response = await request(app).get(
                '/reviews/9jdiks9sk0xx34')
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found(status 404): User does not exist.', 
        async() =>{
            const response = await request(app).get(
                '/reviews/64c9e4f2df7cc072af2ac8a4')
            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with found resource (status 200): GET operation success.', 
        async() =>{
            const response = await request(app).get(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )
})