### Update User Details

This endpoint allows you to update the details of a specific user.

#### Authorization
Visit the [authorization documentation](../../authentication/auth.md) to learn how to acquire authentication token.

#### Request

- Method: PATCH
- URL: {{baseUrl}}/users/65e1d64ea0b2e375e0b0a676
- Authorization: `Bearer <token>`
    

##### Request Body

- raw (application/json)
    - `first_name`: (string) The first name of the user.
    - `last_name`: (string) The last name of the user.
    - `email`: (string) The email address of the user.
    - `password`: (string) The password of the user.
    - `isAdmin`: (boolean) Indicates if the user is an admin.

#### Response

- Status: 200
- Content-Type: application/json
- Location: `/users/<updated item id>`
    

##### Response Body

``` json
{
    "message": "Success message",
    "item": {
        "_id": "user_id",
        "first_name": "Updated first name",
        "last_name": "Updated last name",
        "email": "Updated email",
        "password": "Updated password",
        "isAdmin": true,
        "__v": 0
    }
}
 ```

Example

```javascript
    var request = require('request');
    var options = {
    'method': 'PATCH',
    'url': 'http://localhost:8000/users/65e1d64ea0b2e375e0b0a676',
    'headers': {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJhZmFlbGFfQmVyZ25hdW01QHlhaG9vLmNvbSIsImlhdCI6MTcwOTQ1MjQwNSwiZXhwIjoxNzEyMDQ0NDA1LCJzdWIiOiI2NWUxZDY0ZWEwYjJlMzc1ZTBiMGE2NzYifQ.emEyVdGsOgXEGxiiFWXecom_UHD7FfBd2FtNwYrzkSs',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "first_name": "Darlene",
        "last_name": "Hills",
        "email": "Rafaela_Bergnaum5@yahoo.com",
        "password": "password43",
        "isAdmin": "true"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
```