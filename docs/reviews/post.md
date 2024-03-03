### POST `/reviews`

This endpoint allows you to add a new review for a product.

### Authorization

The endpoint can only be accessed by authenticated users. Get an authorization token from `/auth` and set it as Bearer token.

#### Request Body

- `author` (string, required): The name of the author of the review.
- `product` (string, required): The name of the product being reviewed.
- `content` (string, required): The content of the review.
    

#### Response

- Status: 201
- Content-Type: application/json
- Location: Contains url of the created document in the location header

Example:
```javascript
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

    fetch("http://localhost:8000/reviews", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
```