## GET /users

This endpoint allows the client to retrieve a list of users that are registered with the system. 

The response returns a paginated list by default, the default pagination limit is 10, you can change this value using query parameters as shown below.


## Authorization
Only authenticated users with admin rights can read the list of all users. Visit the [authentication documentation](../authentication/auth.md) to find out how to get authorization token.

### Request
You can send a request to view list of users with the desired pagination constraints or without pagination constraints. If the request does not include client defined constraints, the server will use it's default pagination constraints to process the request. Pagination constraints can be defined using the following query parameters:

- `page`: number
- `limit`: number

Pagination constraints can be included in the url as shown in the following url

```t
/users?page=2&&limit=21
```


### Response
A success response from this endpoint has a status code of 200. The list of users is contained in the response body as a JSON payload. Each object in the users array contains the following user details:

```javascript
    _id: ObjectId 
    first_name: String
    last_name: string
    email: string
    password: string
    isAdmin: boolean 
```

A string form of the user id can be accessed using the virtual property called `id`.

## Example

```javascript
(asyn() =>{

    const response = await fetch('http://localhost:8000/users', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer<token>'
        }
    })

    const body = await response.json()

    console.log('Users: ', body.resource)
})
 ```