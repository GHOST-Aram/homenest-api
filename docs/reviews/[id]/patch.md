## PATCH /reviews/:id

This endpoint allows you to apply partial updates to review documents. A user can only modify the content of the review and not the product id or the author id. A User is not allowed to update the reviews created by other users.

### Authorization
Only authenticated users can call this endpoint. Visit the [authentication documentation](../../authentication/auth.md) to learn how you can get an authentication token.


### Request
In this endpoint, users are only allowed to moodify review content but not other properties of the review.

- Method: PATCH
- URL: {{baseUrl}}/reviews/:id
- Body:
    
    ``` json
      {
        "content": "Lorem ipsum"
      }
    
     ```
    

### Response
A successful request receives a reposnse with status code 200, JSON content in the response body containing a text `message` and an object `item`. The url of the updated document is available in the location header of the response object.

- Status: 200
- Content-Type: application/json
- Location: `reviews/<id>`

Response body includes the following data.
``` json
    {
        "message": "",
        "item": {
        "_id": "",
        "author": "",
        "product": "",
        "content": "",
        "createdAt": "",
        "__v": 0
        }
    }

```
    


    
Code example:
```javascript
(async() =>{

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <auth token>");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "content": "Lorem ipsum qos lados ret.Our esteemed customers"
    });

    const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    try{
        const response = await fetch("http://localhost:8000/reviews/65ea7462c34fc118b24f3de1", requestOptions)
    
        const body = await response.json()
        const url = response.headers.get('Location')

        console.log(body)
        console.log(url)
    }catch(error){
        console.log(error)
    }
   
})
```

Example of Expected response body
```json
{
    "message": "Modified",
    "item": {
        "_id": "65ea7462c34fc118b24f3de1",
        "author": "65e4597a7bd06297bf58cc38",
        "product": "64c9e4f2df7cc072af2ac9e8",
        "content": "Lorem ipsum qos lados ret.Our esteemed customers",
        "createdAt": "2024-03-08T02:13:34.115Z",
        "__v": 0
    }
}
```

