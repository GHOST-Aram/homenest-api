import { assert } from "../../../z-library/testing/response-assertion"
import request from 'supertest'
import { app } from "./config/app"

describe('GET Random reviews', () =>{
    test('Responds with paginated reviews array(status 200): Default lenght 10 ', 
        async() =>{
            const response = await request(app).get('/reviews')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated array (Status 200): Length equals given limit.', 
        async() =>{
            const response = await request(app).get(
                '/reviews?page=1&limit=23')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        } 
    )
})