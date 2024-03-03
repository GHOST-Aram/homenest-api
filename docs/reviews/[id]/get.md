## GET /reviews/:productId

### Description
This endpoint makes an HTTP GET request to retrieve the review with the specified ID. Upon a successful request, the server responds with a status code of 200 and a JSON object containing the review details, including the author, product, content, creation date, and other relevant information.

### Authorization
All users including unregistered can access this endpoint.

Example:
```javascript
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8000/reviews/64c9e4f2df7cc072af2ac9e8", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
``