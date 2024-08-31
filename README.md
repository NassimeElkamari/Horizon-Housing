#Properties manager

## Overview
This application is designed to manage properties, tenants, and rental payments for property managers. It supports CRUD operations for properties and tenants, and provides a rental payment monitoring system. The application also includes authentication to ensure only authorized users can access and modify data.

## Features
- Add properties 
- CRUD operations for tenants 
- Rental payment monitoring system
- Authentication
- Frontend Mini Website: An intuitive interface to use all the APIs, making it easy to manage properties, tenants, and  payments.

## Technologies Used
- Frontend: Next.js, React
- Backend: Node.js, Express
- Database: SQLite, Knex.js
- Authentication: JWT

## Setup and Installation

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   git clone  https://github.com/NassimeElkamari/Horizon-Housing.git 
   cd [project-directory]

2. Install dependencies:
   npm install or yarn install

3. Start the development server:
   npm run dev or yarn dev

4. Usage

- Open a web browser and navigate to http://localhost:3000

Login Credentials:

You can log in using the following credentials:

Email: horizon.housing@gmail.com
Password: horizonhousing@

Alternatively, you can register a new account using the Register page on the website.
Explore the Application:

Once logged in, you can manage properties, tenants, and rental payments using the intuitive interface provided by the frontend mini website.

For backend API documentation, you can use Postman or any other API client to access the endpoints


#### API Documentation

# Authentication API

1. Login
Endpoint: /api/auth/login

Method: POST

Description: Authenticates a user and returns a JWT token if the credentials are valid.

Request Body:

json
Copy code

{
  "identifier": "string", 
  "password": "string"     
}

Responses:

* 200 OK:
Description: Login successful, returns a JWT token.
Response Body:
json
Copy code

{
  "message": "Login successful",
  "token": "string"  
}

* 401 Unauthorized:
Description: Invalid credentials provided.
Response Body:
json
Copy code

{
  "message": "Invalid credentials"
}

* 500 Internal Server Error:
Description: An error occurred during login.
Response Body:
json
Copy code

{
  "message": "Error logging in",
  "error": "string"  
}


2. Register
Endpoint: /api/auth/register

Method: POST

Description: Registers a new user with the provided email, username, and password.

Request Body:

json
Copy code

{
  "email": "string",  
  "username": "string", 
  "password": "string"  
}

Responses:

* 200 OK:
Description: User registered successfully.
Response Body:
json
Copy code

{
  "message": "User registered successfully",
  "userId": "integer"
}

* 500 Internal Server Error:
Description: An error occurred during registration.
Response Body:
json
Copy code

{
  "message": "Error registering user",
  "error": "string"  
}

## Properties API

1. Get All Properties
Endpoint: /api/properties

Method: GET

Description: Retrieves a list of all properties.

Authorization: Requires a valid JWT token.

Responses:

* 200 OK:
Description: A list of properties is returned.
Response Body:
json
Copy code

[
  {
    "id": "integer",
    "name": "string",
    "address": "string",
    "type": "string",   
    "number_of_units": "integer",
    "rental_cost": "number"
  },
]

* 500 Internal Server Error:
Description: An error occurred while fetching properties.
Response Body:
json
Copy code

{
  "message": "Error fetching properties",
  "error": "string"  
}

2. Add a New Property
Endpoint: /api/properties

Method: POST

Description: Adds a new property.

Authorization: Requires a valid JWT token.

Request Body:

json
Copy code

{
  "name": "string",              // The property's name
  "address": "string",           // The property's address
  "type": "string",              // The property's type (e.g., "apartment" or "house")
  "number_of_units": "integer",  // Number of units in the property
  "rental_cost": "number"        // Rental cost of the property
}

Responses:

* 201 Created:
Description: Property added successfully.
Response Body:
json
Copy code

{
  "message": "Property added successfully"
}

* 500 Internal Server Error:
Description: An error occurred while adding the property.
Response Body:
json
Copy code

{
  "message": "Error adding property",
  "error": "string"  // Detailed error message
}

3. Get a Specific Property by ID
Endpoint: /api/properties/[id]

Method: GET

Description: Retrieves a specific property by its ID.

Authorization: Requires a valid JWT token.

Path Parameters:

id: The ID of the property to retrieve.
Responses:

* 200 OK:
Description: The property details are returned.
Response Body:
json
Copy code

{
  "id": "integer",
  "name": "string",
  "address": "string",
  "type": "string",
  "number_of_units": "integer",
  "rental_cost": "number"
}

* 404 Not Found:
Description: Property not found.
Response Body:
json
Copy code

{
  "message": "Property not found"
}

* 500 Internal Server Error:
Description: An error occurred while fetching the property.
Response Body:
json
Copy code

{
  "message": "Error fetching property",
  "error": "string" 
}

######## While the project requirements specifically asked for the ability to add properties, this application includes full CRUD (Create, Read, Update, Delete) functionality for properties. You can explore these features by using the provided website.

### Tenant Management API

1. Add Tenant
Endpoint: POST /api/tenants
Description: Adds a new tenant to a specified property.
Request Body:


  {
    "id": 1,
    "name": "Mohamed ali",
    "contact_details": "+21243424637",
    "section": "Apt 101",
    "property_id": 1
  }


Response:
* 201 Created: Tenant added successfully.
Example:
json
Copy code

{
  "message": "Tenant added successfully"
}

2. Get Tenants
Endpoint: GET /api/tenants
Description: Retrieves all tenants or tenants belonging to a specific property.
Query Parameters:
property_id (integer): (Optional) The ID of the property to filter tenants by.
Response:

* 200 OK: List of tenants.
Example:
json
Copy code
[
  {
    "id": 1,
    "name": "Mohamed ali",
    "contact_details": "+21243424637",
    "section": "Apt 101",
    "property_id": 1
  }
]

3. Get Tenant by ID
Endpoint: GET /api/tenants/[id]
Description: Retrieves a specific tenant by their ID.
Response:

* 200 OK: Tenant details.
* 404 Not Found: Tenant not found.
Example:
json
Copy code

{
    "id": 1,
    "name": "Mohamed ali",
    "contact_details": "+21243424637",
    "section": "Apt 101",
    "property_id": 1
}

4. Update Tenant
Endpoint: PUT /api/tenants/[id]
Description: Updates the details of a specific tenant.
Request Body:

{
    "id": 1,
    "name": "Ahmed ali",
    "contact_details": "+21243424637",
    "section": "Apt 101",
    "property_id": 1
}

Response:

* 200 OK: Tenant updated successfully.
Example:
json
Copy code

{
  "message": "Tenant updated successfully"
}

5. Delete Tenant
Endpoint: DELETE /api/tenants/[id]
Description: Deletes a specific tenant by their ID.
Response:

* 200 OK: Tenant deleted successfully.
Example:
json
Copy code
{
  "message": "Tenant deleted successfully"
}

##### Payments API

1. Get All Payments
Endpoint: GET /api/payments
Description: Retrieves a list of all payments.
Response:
* 200 OK: List of payments.
Example:
json
Copy code

[
  {
    "id": 1,
    "tenant_id": 1,
    "amount": 500,
    "date_paid": "2024-08-15T00:00:00.000Z",
    "settled": true
  }
]

2. Add Payment
Endpoint: POST /api/payments
Description: Adds a new payment record.
Request Body:

{
  "tenant_id": 1,
  "amount": 500,
  "date_paid": "2024-08-15T00:00:00.000Z",
  "settled": true
}


Response:
* 201 Created: Payment added successfully.
Example:
json
Copy code

{
  "message": "Payment added successfully"
}
