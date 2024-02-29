import request from "supertest"
import { describe, test } from "@jest/globals"
import { app } from "./config/app.test.config"
import { assert } from "../../../z-library/testing/response-assertion"

describe('GET Many rentals', () =>{

    test('Responds with paginated data, status 200: (Default pagination = 10', 
        async() =>{
            const response = await request(app).get('/rentals')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated data, status 200: (User defined pagination = 21', 
        async() =>{
            const response = await request(app).get('/rentals?page=1&&limit=21')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 21)
        }
    )
})