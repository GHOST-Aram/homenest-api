## DELETE `/users/:id`

This endpoint sends an HTTP DELETE request to remove a specific user with the provided ID. Upon successful execution, the server responds with a status code of 200 and a JSON object containing a message and the ID of the deleted user. 


### Authorization
Authentication is needed to access this endpoint. Users can only delete their own details and not details of other users. Visit [Authentication documentation](../../authentication/auth.md) to learn how to get an authentication token.


### Request
To delete the details of a user, provide the id of the user as a url parameter. The id must be a 24 character hexadecimal string. The id must be the same as the id of the authenticated user sending the request, this is because users can only be allowed to delete their own information. 

Provide the token in the `Authorization` header as Bearer. 

### Response
A valid response of a request to this endpoint has a status code 200. The response body contains the an object with a text message and the id of the deleted user.

Example:

```javascript
(async() =>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <token>");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };

    const response = await fetch("http://localhost:8000/users/65e449f3a72eaa435166c76c", requestOptions)
    
    const body = await response.json()
    console.log('Message: ', body.message)
    console.log('Deleted id: ', body.id)
})
```
