<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Get the card statement
-   Creates cards
-   Activate / Block / Unblock a card
-   Recharges a card
-   Make card payments

</br>

## API Reference

### Get card statements

```http
  GET /cards/:id/balance
```

#### Response:

```json
{
  "balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
}
```
#

### Create a card

```http
  POST /card/create
```

#### Request:


####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body   | Type       | Description              |
| :----- | :--------- | :----------------------  |
| `id`   | `integer`  | **Required**. employeeId |
| `type` | `[string]` | **Required**. card type  |

`Valid types: [groceries, restaurant, transport, education, health]`

</br>

#

### Activate a card

```http
  POST card/:id/activate
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |
| `securityCode`   | `string` | **Required**. card cvc             |

`Password max length: 4`

`Cvc max length: 3`

#

### Block a card

```http
  POST /card/:id/block
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

`Password max length: 4`

#

### Unblock a card

```http
  POST /card/:id/unblock
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

`Password max length: 4`

#

### Recharge a card

```http
  POST /card/recharge
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `id`             | `integer` | **Required**. card Id              |
| `amount`         | `integer` | **Required**. recharge amount      |

#

### Card payment

```http
  POST /card/payment
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key`    | `string` | **Required**. api key |

####

| Params       | Type      | Description               |
| :----------- | :-------- | :------------------------ |
| `id`         | `integer` | **Required**. card Id     |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `password`       | `string`  | **Required**. card password        |
| `businessId`     | `integer` | **Required**. business Id          |
| `amount`         | `integer` | **Required**. payment amount       |

`Password max length: 4`

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/leolucasguedes/projeto18-valex
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript


</br>

## Authors

-   [@leolucasguedes](https://github.com/leolucasguedes)
