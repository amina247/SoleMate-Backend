# SoleMate - Backend

This repository contains the backend server for the SoleMate shoe collection management website. The server is built using the MERN stack (MongoDB, Express, React, and Node.js).

## Demo

[https://solemate.adaptable.app/](https://solemate.adaptable.app/)

## Features

- User authentication and authorization (with Ironlauncher)
- Shoe collection management (add, edit, and delete shoes)
- Offer management for shoes listed for sale

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Ironlauncher

## Installation

1. Clone the repository.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the root directory and add the necessary environment variables (e.g., MONGODB_URI, JWT_SECRET, PORT).
4. Run `npm start` to start the server or `npm run dev` for development mode with nodemon.

## API Endpoints

- User registration: `POST /api/users/register`
- User login: `POST /api/users/login`
- Add a new shoe: `POST /api/shoes`
- Get all shoes: `GET /api/shoes`
- Get a single shoe: `GET /api/shoes/:id`
- Update a shoe: `PUT /api/shoes/:id`
- Delete a shoe: `DELETE /api/shoes/:id`
- Add an offer: `POST /api/offers`
- Get all offers: `GET /api/offers`
- Update an offer: `PUT /api/offers/:id`
- Delete an offer: `DELETE /api/offers/:id`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


