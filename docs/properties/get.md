## GET /properties

This endpoint allows the client to retrieve a list of properties listed in the system. 

The response returns a paginated list by default, the default pagination limit is 10, you can change this value using query parameters as shown below.


## Authorization
All users can access this endpoint including anonymous users.

### Request
You can send a request to view list of properties with the desired pagination constraints or without pagination constraints. If the request does not include client defined constraints, the server will use it's default pagination constraints to process the request. Pagination constraints can be defined using the following query parameters:

- `page`: number
- `limit`: number

Pagination constraints can be included in the url as shown in the following url

```t
/properties?page=2&&limit=21
```


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
    
    const response = await fetch("http://localhost:8000/properties", requestOptions)
    
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
    },
]
```