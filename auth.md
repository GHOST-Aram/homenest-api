This endpoint allows users to authenticate and obtain a token for accessing protected resources. The HTTP POST request should be made to {{baseUrl}}/auth with the following payload in raw request body type:

``` json
{
    "email": "",
    "password": ""
}

 ```

### Response

- Status: 200
- Content-Type: application/json
    

The response will contain a token that can be used for further authenticated requests.

``` json
{
    "token": ""
}

 ```