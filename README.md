# Feedback Website

## Description
This website collects requirements from customers of a financial analysis system. This website is constructed of three modules: the user information maintenance module, the user feedback management module and the user analysis module.

## Installation

### Prerequisites:
- **Node.js** (Download and install from [nodejs.org](https://nodejs.org))
- **npm** (Comes bundled with Node.js) or **yarn**

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
