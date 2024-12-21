# Feedback Website

## Description
This website collects requirements from customers of a financial analysis system. This website is constructed of three modules: the user information maintenance module, the user feedback management module and the user analysis module.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
   - [Setup with npm or yarn](#setup-with-npm-or-yarn)
   - [Setup MySQL](#setup-mysql)
   - [Setup JSON Web Token (JWT)](#setup-json-web-token-jwt)
   - [Setup Environment Variables](#setup-environment-variables)
   - [Start the Server](#start-the-server)
- [Dependencies](#dependencies)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)

## Installation

### Prerequisites:
- **Node.js** (Download and install from [nodejs.org](https://nodejs.org))
- **npm** (Comes bundled with Node.js) or **yarn**

### Setup with npm or yarn:
1. Clone the repository:
   
   ```bash
   git clone https://github.com/muxunzzz/feedback-website
   cd feedback-website
   ```
3. Install Dependencies:
    
   Using npm:
   ```bash
   npm install
   ```
   or using yarn:
   ```bash
   yarn install
   ```
5. Run the Project:
   
   Development Mode:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   Production Build:
   ```bash
   npm run build
   npm start
   ```

### Setup MySQL:
1. Install MySQL

   **On Windows**:
   1. Download the MySQL installer from [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
	2.	Run the installer and select Server Only during installation.
	3.	Follow the prompts to complete the installation and configure the root password.

   **On macOS (via Homebrew)**:
   ```bash
   brew install mysql
   brew services start mysql
   ```
   
   **On Linux (Ubuntu/Debian)**:
   ```bash
   sudo apt update
   sudo apt install mysql-server
   sudo mysql_secure_installation
   ```

   - During installation, follow the prompts to set a root password and secure the database.
  
2. Configure MySQL

   1. Log into MySQL:
      ```bash
      mysql -u root -p  
      ```
   2. Create a database for the project:
      ```bash
      CREATE DATABASE project_db;
      ```
   3. Create a user and grant permissions:
      ```bash
      CREATE USER 'project_user'@'localhost' IDENTIFIED BY 'password';  
      GRANT ALL PRIVILEGES ON project_db.* TO 'project_user'@'localhost';  
      FLUSH PRIVILEGES;  
      ```

### Setup JSON Web Token (JWT):

1. Install the JWT package:
   ```bash
   npm install jsonwebtoken  
   ```
2. Generate a Secret Key (used to sign the tokens):
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"  
   ```
3. Add the generated key to your .env file:
   ```bash
   JWT_SECRET=your_generated_secret_key
   ```

### Setup Environment Variables:
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
   ```bash
   DATABASE_HOST=your_database_host
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   DATABASE=your_database_name
   JWT_SECRET=your_generated_secret_key
   JWT_EXPIRES=90d
   COOKIE_EXPIRES=90
   ```

### Start the Server:
1. Start the server using the following command:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Dependencies

Main Dependencies
- **Express**: Web application framework for Node.js providing routing, middleware, and HTTP utilities.
- **Cookie-parser**: Middleware to parse and manage HTTP cookies.
- **EJS (Embedded JavaScript)**: Template engine to generate dynamic HTML pages.
- **JSON Web Token (JWT)**: Standard for secure data transfer between parties using JSON objects.
- **mysql**: Node.js driver for connecting and interacting with MySQL databases.

Development Dependencies
- **Dotenv**: Loads environment variables from .env files into process.env.
- **Nodemon**: Monitors file changes and automatically restarts the server during development.

## Technologies Used

Frontend
- **HTML**: Markup language for structuring web pages.
- **CSS**: Stylesheet language for designing and enhancing HTML elements.
- **Node.js**: JavaScript runtime environment for running JavaScript on the client and server.
- **Asynchronous Handling**: Managing non-blocking operations with promises, async/await, and callbacks.

Backend
- **Node.js**: Server-side JavaScript runtime for handling HTTP requests and building APIs.
- **MySQL**: Relational database management system for storing and managing data.

## Acknowledgements
- This is an IA project for IB Computer Science HL.
- Contributor: [@Muxun Zhang](https://github.com/muxunzzz)
