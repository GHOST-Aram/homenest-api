### POST `/reviews`

This endpoint allows a user to add a new review for a product (property in this case).

### Authorization

The endpoint can only be accessed by authenticated users. Visit the [authentication documentation](../authentication/auth.md) to learn how to acquire an authorization token.

#### Request Body
Creating a review for a product requires three values, the id of the author, the id of the product(property) and the text content that makes up the review.

Both the ids of the author and product must be 24 character hexadecimal Object id's. For example, the following object can be used as a request payload for creating a new review:

```json
    "author": "64c9e4f2df7cc072af2ac9e8",
    "product": "64c9e4f2df7cc072af2ac9e8",
    "content": "Lorem inpum"
```

#### Response

This endpoint sends a response with a status code of 201 if successful. The response body contains a json object with two properties, item and message. The item is the newly created created review document and the message is a string ('Created'). The `Location` header of the response object containe the url of the created review.

The url contained in the Location header is in the format `/reviews/<review Id>`.

- Status: 201
- Content-Type: `application/json`
- Location: `/reviews/<id>`

Example:

```javascript

(async () =>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <token>");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "author": "64c9e4f2df7cc072af2ac9e8",
        "product": "64c9e4f2df7cc072af2ac9e8",
        "content": "Lorem inpum"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try{
        const response = await fetch("http://localhost:8000/reviews", requestOptions)
        const body = await response.json()
        const location = await response.headers.get('Locatio')

        console.log('Body: ', body, '\nLocation: ', location)
    } catch(error){
        console.log(error)   
    }

})
```