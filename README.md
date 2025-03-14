# Backend Crud

A node, express, mongoose, mongodb, typescript backend project for basic crud operations.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`BCRYPT_SALT_ROUNDS`

## Run Locally

#### Prerequisite

You need minimum `node v22.13.1` and package manager `npm` installed in your machine

Clone the project

```bash
  git clone https://github.com/onlyyasad/backend-crud.git
```

Go to the project directory

```bash
  cd backend-crud
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## API Reference

#### 1. Get all users

```http
  GET /api/users
```

#### 2. Get user

```http
  GET /api/users/:userId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | **Required**. userId of user data |

#### 3. Create user

```http
  POST /api/users
```

###### Request Body/ Payload

```bash
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

#### 4. Update user

```http
  PUT /api/users/:userId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | **Required**. userId of user data |

###### Request Body/ Payload:

- Similar as create users request body, but this time a single field can be updated as well as multiple.

#### 5. Delete user

```http
  DELETE /api/users/:userId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | **Required**. userId of user data |

#### 6. Get user orders

```http
  GET /api/users/:userId/orders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | **Required**. userId of user data |

#### 6. Get user orders total

```http
  GET /api/users/:userId/orders/total-price
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | **Required**. userId of user data |
