## Authorization `/auth` 

This endpoint allows users to authenticate and obtain a token for accessing protected resources.
The endpoint responds with a json web token for valid user information.

### Request 
The endpoints accepts an a registered valid `email` andress and an alphanumeric `password` as inputs.

``` json
{
    "email": "<registered user email>",
    "password": "< Correct user password>"
}

 ```

### Response
The endpoint responds with status code 201 and the json web token string in the response body.

``` json
{
    "token": "<token>"
}
 ```

Example

```javascript
(async() =>{
    body: JSON.stringify({
        email: "Curtis.Kreiger@gmail.com",
        password: "password43"
    })

    
    const response = await fetch('http://localhost:8000/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })

    const body = await response.json()
    console.log('Token: ', body.token)
})
```