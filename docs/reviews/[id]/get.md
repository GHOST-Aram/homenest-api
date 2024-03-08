# GET `reviews/:id`
This endpoint retrieves a specific review with the given ID.

## Authorization
This endpoint is open to all users including non authenticated users.

## Request
To access the details of a specific review Id, send a request with the ID if the target document in the url as a url param. The ID must be a 24 character hexadecimal string, otherwise the server will reject the ID as invalid.

Example of valid request url
```text
/reviews/65e1f96d93844cc97dff686e
```

## Response
The response includes the details of the review as follows:
```typescript
    _id: string
    author: string //author Id
    product: string //product Id
    content: string
    createdAt: string
```
The response is in JSON format with the status code 200. Below is an example of the expected response body.

```json
    {
        "_id": "65e1f96d93844cc97dff686e",
        "author": "64c9e4f2df7cc072af2ac9e8",
        "product": "64c9e4f2df7cc072af2ac9e8",
        "content": "Lorem ipsum qos lados ret.",
        "createdAt": "2024-03-01T14:43:54.286Z",
        "__v": 0
    }
```

Example request.
```javascript
    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch("http://localhost:8000/reviews/65e1f96d93844cc97dff686e", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
```