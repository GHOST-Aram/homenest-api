import { describe, test } from "@jest/globals";
import request from "supertest"
import { app } from "./config/test.config";
import { postData, invalidData } from "./data/data";
import { assert } from "../../../z-library/testing/response-assertion";

describe('Messenager PUT Requests', () => {
    test('Responds with Method not allowed, status 405: Batch update not allowed', 
        async() =>{
            const response = await request(app).put('/messages')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Updates not allowed on specified message', 
        async() =>{
            const response = await request(app).put('/messages/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Update by sender allowed by sender', 
        async() =>{
            const response = await request(app).put('/messages/sender/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with Method not allowed, status 405: Update by recipient allowed by sender', 
        async() =>{
            const response = await request(app).put('/messages/recipient/64c9e4f2df7cc072af2ac9e4')
                .send(postData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )
})