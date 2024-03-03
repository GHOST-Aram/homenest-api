## GET /users

## Description

This endpoint makes an HTTP GET request to retrieve a list of users from the server. The response will be in JSON format and will include the user details such as their unique ID, first name, last name, email, password, and an indicator of whether the user is an admin. The response will also include a version identifier.

## Authorization

This endpoint is only accessible to users with admin rights.

Visit the authentication documentation to find out how to get authentication token for users with admin rights.

## Example

```
    let request = require('request');
    let options = {
    'method': 'GET',
    'url': 'http://localhost:8000/users',
    'headers': {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkN1cnRpcy5LcmVpZ2VyQGdtYWlsLmNvbSIsImlhdCI6MTcwOTQ0NTQzMiwiZXhwIjoxNzEyMDM3NDMyLCJzdWIiOiI2NWU0MTEwZWMzOTBiMTE0NDUxY2ViYjkifQ.aiH16cbvD3X2k7ShM5ylHQhh5YAKPCPhF-kuPF31u14'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        console.log(response.body);
    });
 ```