## PUT `/properties/:id`

This endpoint allows you to update the information of an exisiting property.

### Authorization
Only authenticated users can access this endpoint. Visit the [authentication documentation](../authentication/auth.md) to get authentication guidelines.

### Request
Provide the authoriation token as Bearer in the authorization header of the request object.
To Update a property, provide the following property details in the request body:

```typescript
    propertyName: string
    propertyType: string

    backgroundImageUrl: string
    rentPerMonth: number
    rentPerYear: number,
    locationName: string
    bedrooms: number
    bathrooms: number
    description: string
    agentId: string
    squareFootage: number
    isAvailable: boolean
    isFurnished: boolean
    hasParkingSpace: boolean
    energySources: string[]
    waterSources: string[]
    petPolicy: string
```    

### Response

A successful response from this endpoint has the status code 200 or 201 depending on whether the update target was found or not. The response body contains a text `message` and an `item` representing the updated property document. The url of the updated item is available in the `Location` header of the response object.




Example:

```javascript
(async() =>{
    const body =  JSON.stringify({
    "propertyName" : "Monalisa",
    "propertyType": "Apartment",

    "backgroundImageUrl": "https://unsplash.com/img123",
    "rentPerMonth": "15000",
    "rentPerYear": "180000",
    "locationName": "Vihiga Road",
    "bedrooms": "3",
   "bathrooms": "2",
    "description": "Lorem Ipsum teds",
    "agentId": "65ea806dcb9951ff03ccb05d",
    "squareFootage": "435",
    "isAvailable": "true",
    "isFurnished": "true",
    "hasParkingSpace": "true",
    "energySources": ["solar", "KPLC"],
    "waterSources": ["Underground", "Nairobi Water"],
    "petPolicy": "Restrited care"
})
    
    const response = await fetch('http://localhost:8000/properties/65ea8bcbfc296f560cac7232', {
        method: 'PUT',
        body,
        headers:{
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer <token>'
        }
    })

    const body = await response.json()

    console.log('property: ', body.item)
    console.log('Message: ', body.message)
    console.log('Location: ', response.headers.get('Location'))

})
```

Example of an expected response body
```json
{
    "message": "Created",
    "item": {
        "propertyName": "Monalisa",
        "propertyType": "Apartment",
        "rentPerMonth": 15000,
        "rentPerYear": 180000,
        "locationName": "Vihiga Road",
        "bedrooms": 3,
        "bathrooms": 2,
        "backgroundImageUrl": "https://unsplash.com/img123",
        "description": "Lorem Ipsum teds",
        "agentId": "65ea806dcb9951ff03ccb05d",
        "squareFootage": 435,
        "isAvailable": true,
        "isFurnished": true,
        "hasParkingSpace": true,
        "energySources": [
            "solar",
            "KPLC"
        ],
        "waterSources": [
            "Underground",
            "Nairobi Water"
        ],
        "petPolicy": "Restrited care",
        "_id": "65ea8bcbfc296f560cac7232",
        "__v": 0
    }
}
```