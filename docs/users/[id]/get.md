## GET users/:id

This endpoint makes allows you to retrieve user details using a specified user ID. The response is in JSON format and includes the following user details.

- first name 
- last name 
- email
- password
- isAdmin status

### Authorization
User details can only be read by an authenticated user. An authenticated user can read the details of any other user in the system. Visit the [authentication documentation](../../authentication/auth.md) to learn how to get authenticated.


### Request
To get the details of a user with a specific id, provide the id as a url parameter in the request url as shown below:
```
/users/<userId>
```

The `userId` must me a 24 character hexadecimal string. 

Provide it in the `Authorization` header as Bearer token, to authenticate the request.

### Response
A successful response sent from this endpoint has a status code of 200. The user details are contaied in the response body as a json payload. The json payload contains a text `message` and an `item` the following details:

- `first_name`: string 
- `last_name`: string 
- `email`: string
- `password`: string
- `isAdmin`: boolean


Example
```javascript
(async() =>{
    const response =  await fetch('http://localhost:8000/users/65e40da5c390b114451cebb5',{
        method: 'GET',
        headers:{
            'Authorization': 'Bearer <Authorization token>'
        }
    })

    const body = await response.json()
    console.log(body.item)
})
```