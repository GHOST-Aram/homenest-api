## GET /properties/landlord/:id

This endpoint allows the client to retrieve a list of properties created by a specific landlord using the landlord Id.


## Authorization
All users can access this endpoint including anonymous users.

### Request
The request to this point requires one url params, the landlord Id. The Id must be a 24 character hexadecimal string otherwise the server will reject the request with validation errors.


### Response
A successful response from this endpoint has a status code of 200. The list of properties is contained in the response body as a JSON payload. Each object in the properties array contains the following details:

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
    landlord: string
    squareFootage: number
    isAvailable: boolean
    isFurnished: boolean
    hasParkingSpace: boolean
    energySources: string[]
    waterSources: string[]
    petPolicy: string
    createdAt: string
    images:[]
    _id: ObjectId
  
```

## Example
```javascript
(async() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    const response = await fetch("http://localhost:8000/properties/landlords/65ea806dcb9951ff03ccb05d", requestOptions)
    
    const body = await response.json()
    console.log(body)
})
```

An exapmle of expected output

```json
[
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
        "landlord": "65ea806dcb9951ff03ccb05d",
        "squareFootage": 435,
        "isAvailable": true,
        "isFurnished": true,
        "hasParkingSpace": true,
        "images":[],
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
    },
]
```