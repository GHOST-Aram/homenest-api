## GET /reviews

This endpoint sends an HTTP GET request to retrieve a list of reviews. The response will be in JSON format and will include an array of review objects, each containing the _id, author, product, content, and createdAt fields. 

### Athorization
This endpoint is only accessible to users with admin rights. Only admis are allowed to view the entire list of reviews in the database without specifying a product id. Visit [authorization documentation](../authentication/auth.md) to get an authorization token. Once you receive the token, include it in the `Authorization` header of your request as Bearer.


### Request
The endpoint is programmed to request for a list with a default pagination of limit 10 unless a different value is provided. You can define your prefered pagination using query parameters as shown below.

`/reviews?page=<page_number>&&limit=<length_of_reviews_list>`

For example, if you want the response to send an array containing 21 reviews begining from the 22nd review in the database, you can write your request url as `/reviews?page=2&&limit=21`.

### Response
The endpoint responds with status code 200 and a list of reviews. A GET request with query parameters will receive an array containing not more than the number of items represented by the `limit` param. A request sent without query parameters will be processed with a default pagination limit of 10.


Example: 

```javascript
(async() =>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <token>");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const reponse = await fetch("http://localhost:8000/reviews?page=2&&limit=21", requestOptions)

        const body = await response.json()
        console.log('reviews: ', body)
    } catch(error){
        console.log(error)
    }
})
```




