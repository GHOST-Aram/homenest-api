import { describe } from "@jest/globals";
import { app } from "./config/test.config";
import { assert } from "../../../z-library/testing/response-assertion";
import request from "supertest"

describe('GET Many applications', () =>{

    test('Responds with paginated data, status 200: (Default pagination = 10)', 
        async() =>{
            const response = await request(app).get('/application-submission')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated data, status 200: (User defined pagination = 21', 
        async() =>{
            const response = await request(app).get('/application-submission?page=1&&limit=21')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 21)
        }
    )
})