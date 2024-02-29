import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { postData, invalidData } from "./data/data";
import { assert } from "../../../z-library/testing/response-assertion";

describe('Messages patch Requests', () => {
    test('Responds with Method not allowed, status 405: Batch Modification not allowed', 
        async() =>{
            const response = await request(app).patch('/messages')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Modifications not allowed on specified message', 
        async() =>{
            const response = await request(app).patch('/messages/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Modification by sender allowed by sender', 
        async() =>{
            const response = await request(app).patch('/messages/sender/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Modification by recipient allowed by sender', 
        async() =>{
            const response = await request(app).patch('/messages/recipient/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )
})