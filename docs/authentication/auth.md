## Authorization `/auth` 

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

Example

```
    let request = require('request');
    let options = {
    'method': 'POST',
    'url': 'http://localhost:8000/auth',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "email": "Curtis.Kreiger@gmail.com",
        "password": "password43"
    })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
    console.log(response.body);
    });
```