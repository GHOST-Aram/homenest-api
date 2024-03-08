## DELETE `/properties/:id`

This endpoint allows the client to remove a specific property  from the listings by ID. 


### Authorization
Only authenticated users can access this endpoint. Visit the [authentication documentation](../authentication/auth.md) to get authentication guidelines.

### Request
Provide the authoriation token as Bearer in the authorization header of the request object.
Provide the id of the target document in the urls. The id must be a 24 character hexadecimal string. Send a GET request with the id of the target document in the url params as shown below.

```javascript
'/properties/<24 character hexadecimal string>'
```


### Response
A successful response from this endpoint has a status code of 200. The response body contains a text `message` and the `id` of the deleted item. 


## Example
```javascript
(async() => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    
    const response = await fetch("http://localhost:8000/properties/65ea8912cb9951ff03ccb061", requestOptions)
    
    const body = await response.json()
    console.log("Message: ", body.message)
    console.log("Deleted Id: ", body.id)
})
```

An exapmle of expected output

```json
{
    "message": "Deleted",
    "id": "65ea8912cb9951ff03ccb061"
}
```