## GET `/properties/:id`

This endpoint allows the client to retrieve a specific property by ID. 


## Authorization
All users can access this endpoint including anonymous users.

### Request
Send a GET request with the id of the target document in the url params as shown below.

```javascript
'/properties/<24 character hexadecimal string>'
```


### Response
A successful response from this endpoint has a status code of 200. The response body contains a JSON object with the following properties:

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
    createdAt: string
    _id: ObjectId
  
```

## Example
```javascript
(async() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    const response = await fetch("http://localhost:8000/properties/65ea8912cb9951ff03ccb061", requestOptions)
    
    const body = await response.json()
    console.log(body)
})
```

An exapmle of expected output

```json
     {
        "_id": "65ea8912cb9951ff03ccb061",
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
        "__v": 0
    }
```