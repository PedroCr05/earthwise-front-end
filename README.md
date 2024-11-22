<div style="width:25%; margin: auto;">
  <img src="./assets/Site-Logo/favicon.ico" width="100px" alt="earthwise-packaging-logo">
</div>

# EARTHWISE PACKAGING

## Project Description

Welcome to **Earthwise Packaging**, where we’re on a mission to help the food industry go green!
<br /> Our site offers eco-friendly essentials, from composable cups to biodegradable utensils.
<br />Think of us as an eco-supplier, making it easy for businesses to browse, buy, and breathe easier knowing they’re reducing waste.
<br />Together, we’re packing up pollution and unboxing a greener future one composable fork at a time!

## Table of Contents

### [📚](#table-of-contents) | The books is a clickable emoji, so you can redirect back to this list!

- **_[Tech Stack](#tech-stack)_**
- **_[How to Download & Run](#how-to-download--run-the-project)_**
- **_[Features](#features)_**
  - **_[End-Point Charts](#endpoints-chart)_**
  - **_[Portals](#portals)_**
  - **_[Models](#models)_**
  - **_[Product Ideas](#items-listed-for-now-idea)_**
- **_[Developers](#who-created-this-project)_**
- **_[Back Logs](#project-backlog)_**
- **_[Stretch Goals](#stretch-goals)_**

## Tech Stack

##### [📚](#table-of-contents)

| Section       | Technology Used           |
| ------------- | ------------------------- |
| **Database:** | MongoDB                   |
| **Backend:**  | Node.js, Express, _&_ JWT |
| **Frontend:** | Axios, CSS, _&_ React     |

## How to Download & Run the Project

##### [📚](#table-of-contents)

### Prerequisites

1. Node.js v14+
2. npm v6+
3. MongoDB Account

### Fork & Clone

1. Clone the repository: `git clone https://github.com/<yourusername>/earthwise-packaging.git`
2. Navigate into the directory: `cd earthwise-packaging`
3. Install dependencies: `npm install`

### Starting the Development Server

1. Run `npm run dev` to launch the local server.
2. Visit `http://localhost:3000` in your browser to see the project.
3. It is advised to run **both** the **_Back End_** _&_ **_Front End_** Simiulatiously.

## Features

##### [📚](#table-of-contents)

### Endpoints Chart

##### [📚](#table-of-contents)

#### Endpoint for Users/Customers

| HTTP Method | URI                    | Description                                        | Is it an _MVP_? |
| ----------- | ---------------------- | -------------------------------------------------- | --------------- |
| `GET:`      | `/products`            | **Get** all `Products`                             | _Yes_           |
| `GET(ID):`  | `/products/:productId` | **Get** a single `Product`                         | _Yes_           |
| `GET:`      | `/cart`                | **Get** all `Products` inside the cart             | **_No_**        |
| `PUT:`      | `/cart/:cardId`        | **Update** a single `Product` amount from the cart | **_No_**        |
| `DELETE:`   | `/cart/:cartId`        | **Delete** a single `Product` from the cart        | **_No_**        |

#### Endpoints for Admins

| HTTP Method | URI                    | Description                                        | Is it an _MVP_? |
| ----------- | ---------------------- | -------------------------------------------------- | --------------- |
| `POST:`     | `/products`            | **Create** a `Product` listing into the data base  | _Yes_           |
| `PUT:`      | `/products/:productId` | **Update** a single `Product` from the data base   | _Yes_           |
| `DELETE:`   | `/products/:productId` | **Delete** a single `Product` from the data base   | _Yes_           |
| `PUT:`      | `/cart/:cardId`        | **Update** a single `Product` amount from the cart | **_No_**        |
| `DELETE:`   | `/cart/:cartId`        | **Delete** a single `Product` from the cart        | **_No_**        |

### Portals

##### [📚](#table-of-contents)

- Customer Only Portal/Access -> MVP
- Admin Only Portal/Access -> Post MVP

### Models

##### [📚](#table-of-contents)

---

#### 1. User/Customer Model

| Tag Name               | Syntax     | _Required_? |
| ---------------------- | ---------- | ----------- |
| `Email:`               | **String** | _Yes_       |
| `Full-Address:`        | **String** | _Yes_       |
| `Name:`                | **String** | _Yes_       |
| `Password:`            | **String** | _Yes_       |
| `Payment-Information:` | **String** | _Yes_       |
| `Company-Name:`        | **String** | **_No_**    |
| `Username:`            | **String** | **_No_**    |
| `Phone-Number:`        | **Number** | _Yes_       |

#### 2. Inventory/Product Options

| Tag Name                        | Syntax                  | _Required_? |
| ------------------------------- | ----------------------- | ----------- |
| `Product-Description:`          | **String**              | _Yes_       |
| `Product-Image:`                | **String**              | _Yes_       |
| `Product-Name:`                 | **String**              | _Yes_       |
| `Product-Quick-Facts:`          | **String**              | **_No_**    |
| `Reviews:`                      | **String (_Embedded_)** | **_No_**    |
| `In-Stock-Status:`              | **Number**              | _Yes_       |
| `Product-Price:`                | **Number**              | _Yes_       |
| `Product-SKU/Manufacturer-SKU:` | **Number**              | _Yes_       |
| `Quantity:`                     | **Number**              | _Yes_       |

---

### Items listed for now (_idea_)

##### [📚](#table-of-contents)

| Category                  | Products                                                                |
| ------------------------- | ----------------------------------------------------------------------- |
| `Food & Eating Supplies:` | Plates, Straws, Utensils, & Cups (hot, cold, & multiple sizes)          |
| `Kitchen Essentials:`     | Catering boxes/items, Liner sheets, To-go containers, & Carry-out boxes |

## Who created this Project?

##### [📚](#table-of-contents)

| Developers | _What Part?_                 |
| ---------- | ---------------------------- |
| `Jason:`   | **Back** _&_ **Front** - End |
| `Jessica:` | **Back** _&_ **Front** - End |
| `Pedro:`   | **Front** - End              |

## Project Backlog

##### [📚](#table-of-contents)

### [▶](https://github.com/users/jharreldesign/projects/1) Kanban/Back Logs

## Stretch Goals

##### [📚](#table-of-contents)

| By who?     | _On what exactly_?                               | _Where_?                   |
| ----------- | ------------------------------------------------ | -------------------------- |
| `Pedro:`    | A prefetch product when a user hovers a product  | **Front** End              |
| `Jason:`    | Shipping options with shipping progress.         | **Back** End               |
| `Everyone:` | Being able to implement a search/filter feature. | **Back** _&_ **Front** End |
