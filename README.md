# SkinVault-BackEnd-Project


### Overview
SkinVault-BackEnd-FullStack is a backend service for a review platform designed for a client of Fullstack Solutions. This RESTful API allows users to register, log in, browse items, and submit reviews. The project aims to create a structured and scalable backend before integrating a frontend at a later stage.

---

### Features

#### As a Guest User (Not Logged In):
- Sign up for an account to access a personalized experience.
- Log in if already registered.
- Browse and read reviews without authentication.
- View a list of all available items.
- View detailed information about a specific item (e.g., store, restaurant, product, book).
- See all reviews associated with a specific item.

#### As a Logged-In User:
- Access personal account information.
- Write and submit a review for an item, including:
  - A written text review.
  - A score/rating.
- View a list of all reviews submitted by the user.
- Delete reviews submitted by the user.

#### As an Engineer:
- Maintain a well-seeded database to simulate different user scenarios.

---

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in an existing user.
- `GET /api/auth/me` 🔒 - Retrieve authenticated user details.

#### Items
- `GET /api/items` - Retrieve all items.
- `GET /api/items/:itemId` - Retrieve details for a specific item.
- `GET /api/items/:itemId/reviews` - Retrieve reviews for a specific item.

#### Reviews
- `POST /api/items/:itemId/reviews` 🔒 - Submit a review for an item.
- `GET /api/reviews/me` 🔒 - Retrieve reviews submitted by the authenticated user.
- `DELETE /api/reviews/:reviewId` 🔒 - Delete a specific review by its ID.

---

### Technologies Used
- **Node.js** - Backend runtime.
- **Express.js** - Web framework for handling API routes.
- **PostgreSQL** - Relational database for storing data.
- **JWT (JSON Web Tokens)** - Authentication mechanism.
- **Sequelize** - ORM for database management.
- **BCrypt** - Hashing for secure user passwords.

---

### Setup Instructions

#### Prerequisites:
- Install **Node.js** and **PostgreSQL**.
- Clone this repository:
  ```sh
  git clone https://github.com/yourusername/SkinVault-BackEnd-FullStack.git
  cd SkinVault-BackEnd-FullStack
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Set up environment variables in a `.env` file:
  ```
  DATABASE_URL=your_database_url
  JWT_SECRET=your_secret_key
  ```
- Run the database migrations and seed the database:
  ```sh
  npm run migrate
  npm run seed
  ```
- Start the development server:
  ```sh
  npm run dev
  ```

---

### Testing the API
You can test the API endpoints using **Postman** or **cURL**. Authentication-protected routes require a valid JWT token.

---

### Future Improvements
- Implement frontend integration.
- Add search and filter functionality for items.
- Enhance user roles and permissions.
- Improve error handling and validation.

---

### License
This project is licensed under the MIT License.

---


