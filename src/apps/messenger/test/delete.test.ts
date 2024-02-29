import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { assert } from "../../../z-library/testing/response-assertion";

describe('DELETE Messages', () => {
    test('Responds with method not allowed, status 405: Rejects delete all',
        async() =>{
            const response = await request(app).delete('/messages')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Delete by sender Id not allowed', 
        async() =>{
            const response = await request(app).delete('/messages/sender/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Delete by recipient Id not allowed', 
        async() =>{
            const response = await request(app).delete('/messages/recipient/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Rejects unspecfied paths (as sent or received)', 
        async() =>{
            const response = await request(app).delete('/messages/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithMethodNotAllowed(response)
        }
    )
})