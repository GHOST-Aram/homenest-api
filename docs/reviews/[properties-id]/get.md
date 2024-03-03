## GET /reviews/properties/:propertyId

This endpoint allows you to retrieve all the reviews for the property with the specified ID. Upon a successful request, the server responds with a status code of 200 and a JSON object containing an array of reviews made for the specified property. Each review object includes the author id, property id, review content content and creation date.

### Authorization
All users including unregistered can access this endpoint.

### Request
To get reviews for a specific property simply provide the ID of the target within the url. The Id has to be a 24 character hexadecimal string. Invalid Id will trigger an error response. The endpoint will process the request with a default pagination limit of 10. The desired limit of pagination can be provided using the following query parameters:

- page: number 
- limit: number

A request url with custom pagination limit of 21 starting from the first item can be written as follows.

```
/reviews/properties/<id>?page=1&&limit=21
```


### Response
The response has status code 200. The response body contains an array of reviews of length 10 or less by default or the length defined by a custom pagination limit.


Example:
```javascript
(async() =>{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const response = await fetch("http://localhost:8000/reviews/propeties/64c9e4f2df7cc072af2ac9e8", requestOptions)
    
    const reviews = await response.json()
    console.log('Reviews: ', reviews)
})
``