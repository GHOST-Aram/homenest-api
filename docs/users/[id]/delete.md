## DELETE `/users/:id`

### Description
This endpoint sends an HTTP DELETE request to remove a specific user with the provided ID. Upon successful execution, the server responds with a status code of 200 and a JSON object containing a message and the ID of the deleted user.

Authentication is needed to access this endpoint. Users can only delete their own details and not details of other users. 

### Authorization
Visit [Authorization documentation](../../authentication/auth.md) to learn how to get authorization token.

Code
```javascript
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <token>");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };

    fetch("http://localhost:8000/users/65e449f3a72eaa435166c76c", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
```
