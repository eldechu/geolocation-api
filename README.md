# Geolocation-API

Service provides API for adding, getting and deleting geolocation data from database.
Geolocation data is fetched on each request from ipstack.com. Free subscription of ipstack.com API allows 100 API calls/month. If pool is exhausted, adding new addresses to db will not be possible.
Nevertheless service starts with few initial entries in DB, so GET, DETLETE methods are always available for local testing purposes.

## Usage
### Login
API is secured with bearer token. Obtaining token with **/api/v1/login**. Token expires in 6 hours.

**method: POST**

User registration form not implemented. Hardcoded user data available:

#### Request
JS example code:
```js
fetch('http://localhost:8080/api/v1/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: {
        "email" : "testmail@gmail.com",
        "password" : "testpassword"
    }
  })
```
Curl:
```
curl --location --request POST 'localhost:8080/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "testmail@gmail.com",
    "password" : "testpassword"
}'
```
#### Response
```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDA0MTQ0NSwiZXhwIjoxNjYwMDQ1MDQ1fQ.opsdspl0LwzZhQ_TRWO7lgdDnfN0EBd06SfEbJhojlo",
    "userId": "testmail@gmail.com"
}
```

### Get geolocation data
API provides access to one or all geolocation objects with 1 request:

**/api/v1/geolocation** - all objects

**/api/v1/geolocation/:address** - 1 object

**method: GET**

**:address** can be an IP (both IPv4 and IPv6 acceptable) or domain

Service responses with data stored in Geolocation-API database (not ipstack.com).

##### Request

JS example code:
```js
 fetch('http://localhost:8080/api/v1/geolocation', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDAzNTM5NSwiZXhwIjoxNjYwMDM4OTk1fQ.bjxx1CCJPf05WIJjYTUkizJu2h01gBJYf_6nt_6UMA0",
    },
  })
```

```js
 fetch('http://localhost:8080/api/v1/geolocation/google.com', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDAzNTM5NSwiZXhwIjoxNjYwMDM4OTk1fQ.bjxx1CCJPf05WIJjYTUkizJu2h01gBJYf_6nt_6UMA0",
    },
  })
```

Curl
```
curl --location --request GET 'localhost:8080/api/v1/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDAzNTM5NSwiZXhwIjoxNjYwMDM4OTk1fQ.bjxx1CCJPf05WIJjYTUkizJu2h01gBJYf_6nt_6UMA0' \
--data-raw ''
```

### Add geolocation data
Service adds new geolocation data based on data received from ipstack.com API.

**/api/v1/geolocation/:address**

**method: POST**

**:address** can be an IP (both IPv4 and IPv6 acceptable) or domain

##### Request

JS example code:
```js
fetch('http://localhost:8080/api/v1/geolocation', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDAzNTM5NSwiZXhwIjoxNjYwMDM4OTk1fQ.bjxx1CCJPf05WIJjYTUkizJu2h01gBJYf_6nt_6UMA0",
    },
    body: {
        "address": "wp.pl"
    }
  })
```

Curl
```
curl --location --request POST 'localhost:8080/api/v1/geolocation' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDAzNTM5NSwiZXhwIjoxNjYwMDM4OTk1fQ.bjxx1CCJPf05WIJjYTUkizJu2h01gBJYf_6nt_6UMA0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address": "wp.pl"
}'
```

### Delete geolocation data
Service deletes single entry from its storage if address is found.

**/api/v1/geolocation/:address**

**method: DELETE**

**:address** can be an IP (both IPv4 and IPv6 acceptable) or domain

##### Request

JS example code:
```js
 fetch('http://localhost:8080/api/v1/geolocation/google.com', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDAzNTM5NSwiZXhwIjoxNjYwMDM4OTk1fQ.bjxx1CCJPf05WIJjYTUkizJu2h01gBJYf_6nt_6UMA0",
    },
  })
```
```
curl --location --request DELETE 'localhost:8080/api/v1/geolocation/74.6.231.20' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDA3OTk5MywiZXhwIjoxNjYwMDgzNTkzfQ.LV_P605sFdyqA7DRO8ymNiJy0eRW1eNjH6Imo21bytw' \
--data-raw ''
```

# Local deployment
Deployed on Node.js v.18
Option A) In root directory of the repository:
```
npm install
npm start
```
Option B) Downloading Docker image and deploying in Docker container:
```
docker run -dp 8080:8080 leszekkaleta/geolocation-api
```

Local deplyment serves API on port 8080: localhost:8080/api/v1

# Tests 
Only sample tests provided due to time constraits (starting holiday on 11.08.2022)
```
npm test
```