import { describe } from "@jest/globals";
import { app } from "./config/test.config";
import request from "supertest"
import { assert } from "../../../z-library/testing/response-assertion";

describe('DELETE Received message', () =>{

    test('Responds with method not allowed, status 405: '+'Rejects batch deletion of all received messaes', 
        async() =>{
            const response = await request(app).delete('/messages/received')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Ivalid application id', 
        async() => {
            const response = await request(app).delete(
                '/messages/received/64c9e4f2df7cc0tgd')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with the deleted item id, status 200: Delete success',
        async() =>{
            const response = await request(app).delete(
                '/messages/received/64c9e4f2df7cc072af2ac9e0')

            assert.respondsWithSuccess(response)
            assert.respondsWithDeletedResource(response)
        }
    )

    test('Responds with Not Found, status 404: Target does not exist', 
        async() => {
            const response = await request(app).delete(
                '/messages/received/64c9e4f2df7cc072af2ac9e8')

            assert.respondsWithNotFound(response)
        }
    )
})