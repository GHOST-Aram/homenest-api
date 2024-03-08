# DELETE `/reviews/<id>`
This endpoint can be used to delete specific review document by id. Users can only delete the reviews that they created.


## Authorization
Only authenticated users can delete reviews. Visit the [authentication documentation](../../authentication/auth.md) to learn how to get authenticated.

## Request
A delete request can be sent by including the id of the document to be deleted in the url as a url param. The Id must be a 24 character hexadecimal string, otherwise the system will reject the id as invalid.

```javascript
'/reviews/<24 character hexadecimal string id>'
```

## Response
A successfull delete request receives a response with status code 200. The response body has a text `message` and the `id` of the deleted item. An example is shown below:

```json
{
    "message": "Deleted",
    "id": "65ea806dcb9951ff03ccb05d"
}
```

Code example:
```javascript
(async() =>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <auth token>");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch("http://localhost:8000/reviews/65ea806dcb9951ff03ccb05d", requestOptions)
                
        const body = await response.json()
        console.log('Message: ', body.message)
        console.log('Deleted Id: ', body.id)
    } catch(error){
        console.log(error)
    }
})
```