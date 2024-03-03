### POST

This endpoint allows you to create a new user.

### Authorization

You do not need authorization to use this endpoint.

#### Request Body

- `first_name` (text, required): The first name of the user.
- `last_name` (text, required): The last name of the user.
- `email` (text, required): The email address of the user.
- `password` (text, required): The password for the user.

```json
    {
        "first_name": "Curtis",
        "last_name": "Moore",
        "email": "Nyasia.Kreiger@gmail.com",
        "password":"password43"
    }
```
    

#### Response
The response body contains a message and the item created. The url of the created item in the `Location` header of the response object.

- Status: 201 Created
- Content-Type: application/json
- Location: `/users/:id` - url of the created document
- `message` (string): A message confirming the success of the user creation.
- `item` (object): An object containing the details of the newly created user, including their first name, last name, email, password, isAdmin status, _id, and __v.


```json
{
    "message": "Created",
    "item": {
        "first_name": "Curtis",
        "last_name": "Moore",
        "email": "Nyasia.Kreiger@gmail.com",
        "password": "$2b$10$fhpVZKdeDpRU0rNZx6Wx7Ove2/x/N1BY487hKh.g8.MYglyxmeRyG",
        "isAdmin": false,
        "_id": "65e40da5c390b114451cebb5",
        "__v": 0
    }
}
```

Exampl:

```
    let request = require('request');
    let options = {
    'method': 'POST',
    'url': 'http://localhost:8000/users',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "last_name": "John",
        "first_name": "Does",
        "email": "johndoe@gmail.com",
        "password": "password43",
        "isAdmin": "true"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
```

