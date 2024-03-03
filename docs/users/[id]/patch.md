## PATCH `users/:id`

This endpoint allows you to apply partial updates on the details of a specific user.

### Authorization

Only authorised users can modify their information. Visit the [authorization documentation](../../authentication/auth.md) to learn how to acquire authentication token.


### Request

Provide the id of the user as a url parameter. The id in the url parameter must be a 24 character hezadecimal string. Invalid ID will trigger error response. The id in the parameter has to be the same as the id of the user sending this request, this is because users can only update their own details and not the details of other users. Provide the authorization token as Bearer in the `Authorization` header of the request.

The request body can contain some or all of the following details about the user:
    - `first_name`: (string) The first name of the user.
    - `last_name`: (string) The last name of the user.
    - `email`: (string) The email address of the user.
    - `password`: (string) The password of the user.
    - `isAdmin`: (boolean) Indicates if the user is an admin.

### Response

A successfull patch request receives a response with a status code of 200. The url of the updated user is available in the `Location` header of the response. The response body contains a json palyload with a text `message` and an object containing the modified user details.

Example:

```javascript
(async() =>{
    const body = JSON.stringify({
        first_name: "Darlene",
        last_name: "Hills",
        email: "Rafaela_Bergnaum5@yahoo.com",
        isAdmin: "true"
    })

    const response = await fetch( 'http://localhost:8000/users/65e1d64ea0b2e375e0b0a676',{
        method: 'PATCH',
        body,
        headers:{
            'Authorization': 'Bearer <toke>'
        }
    })

    const body = await response.json()
    console.log('Message :', body.message)
    console.log('User: ', body.item)
})
```