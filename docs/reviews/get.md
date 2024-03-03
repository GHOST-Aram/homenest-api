## GET /reviews

### Description
This endpoint sends an HTTP GET request to retrieve a list of reviews. The response will be in JSON format and will include an array of review objects, each containing the _id, author, product, content, and createdAt fields.

The list of documentation is paginated to a limit of 10 items by default. You can define your prefered pagination using query parameters as shown below

`/reviews?page=2&&limit=21`

### Athorization
This endpoint is only accessible to users with admin rights. Visit [authorization documentation](../authentication/auth.md) to get an authorization token.

```javascript
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkN1cnRpcy5LcmVpZ2VyQGdtYWlsLmNvbSIsImlhdCI6MTcwOTQ0NTQzMiwiZXhwIjoxNzEyMDM3NDMyLCJzdWIiOiI2NWU0MTEwZWMzOTBiMTE0NDUxY2ViYjkifQ.aiH16cbvD3X2k7ShM5ylHQhh5YAKPCPhF-kuPF31u14");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://localhost:8000/reviews", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
```
