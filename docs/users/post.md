## POST `/users`

This endpoint allows you to create a new user.

### Authorization
You do not need authorization to use this endpoint.

### Request
Users can be created as either admins or regular users. To create a new user, provide the following user details in the request body:

```typescript
    first_name: string
    last_name: string
    email: string
    password: string // must be a minimum of 8 character and alphanumeric
    isAdmin?: boolean //optional
```

If the value of the `isAdmin` property is not provided, the server will use `false` as default.
    

### Response

A successful response from this endpoint has the status code 201. The response body contains a text `message` and an `item` representing the created user document. The url of the created item in the `Location` header of the response object.




Example:

```javascript
(async() =>{
    const body =  JSON.stringify({
        "first_name": "Curtis",
        "last_name": "Moore",
        "email": "Nyasia.Kreiger@gmail.com",
        "password": "password43",
        "isAdmin": "true"
    })
    
    const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        body,
        headers:{
            'Content-Type': 'application/json'
        }
    })

    const body = await response.json()

    console.log('User: ', body.item)
    console.log('Message: ', body.message)

})
```