# Project Title: E-commerce Back End ORM Challenge

## Description
This project is an example backend for an e-commerce website. Using Express.js and Sequelize, this application interfaces with a MySQL database, providing solutions for managing e-commerce data. This back end system is essential for businesses looking to compete in the digital marketplace, allowing for efficient handling of product, category, and tag information.

Users will be able to see all category, product, and tag data, as well as update, create, or delete products, categories, or tags. 

## Installation

**Prerequisites:**
- Node.js
- MySQL

**Steps:**
1. Clone the repository: `git clone [repository-link]`
2. Navigate to the project directory: `cd [project-directory]`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory with the following contents:
    ```
    DB_NAME='ecommerce_db'
    DB_USER='[your_mysql_username]'
    DB_PW='[your_mysql_password]'
    ```
5. Initialize the database:
   - Log into MySQL shell: `mysql -u root -p`
   - Source the schema: `source db/schema.sql`
   - Exit MySQL shell: `exit`
6. Seed the database: `npm run seed`

## Usage

Start the server using the command: `npm start`

**Testing API Routes:**
- Utilize Insomnia Core to test API routes.
- Routes available:
   - GET, POST, PUT, DELETE for categories, products, and tags.

Refer to the provided walkthrough video for a demonstration of the application's functionality.

## Features

- **Sequelize ORM:** Efficiently interacts with a MySQL database using Sequelize.
- **Express.js API:** Leverages Express.js for handling API requests.
- **CRUD Operations:** Supports Create, Read, Update, and Delete operations for products, categories, and tags.
- **Data Validation:** Ensures data integrity with Sequelize validations.
- **Environment Variable Integration:** Secures database credentials using `.env` files.

## Database Models

- **Category:** Stores category information with fields for ID and category name.
- **Product:** Contains product details including ID, name, price, stock, and category ID.
- **Tag:** Holds tag information with ID and tag name.
- **ProductTag:** Manages many-to-many relationships between products and tags.

## Associations

- Products belong to Categories.
- Categories have many Products.
- Products belong to many Tags (through ProductTag).
- Tags belong to many Products (through ProductTag).

## Video Run-Through

[See it in use](https://drive.google.com/file/d/10uhTVDLi0etOlYZGFqM_OI020pwkWhyI/view)
