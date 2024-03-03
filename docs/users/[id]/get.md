## GET users/:id

### Authorization

Get authorization token from `/auth` and provide it in the `Authorization` header as Bearer token.

### Description

This endpoint makes an HTTP GET request to retrieve user details based on the provided user ID. The response will be in JSON format and will include the user's first name, last name, email, password, and isAdmin status.

### Example
```
    let request = require('request');
    let options = {
    'method': 'GET',
    'url': 'http://localhost:8000/users/65e40da5c390b114451cebb5',
    'headers': {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im93aW5vb2phbGFAZ21haWwuY29tIiwiaWF0IjoxNzA5NDQzMjQ5LCJleHAiOjE3MTIwMzUyNDksInN1YiI6IjY1ZTBkYjdjYTBiMmUzNzVlMGIwYTY3MiJ9.z4rqgxDdbyv4sQWKn0xt9yUHXbNsnm-i62FA6s-_wD4'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
```