
# Nairobi House Hunt

- Nairobi House Hunt is a full-stack property search and management application designed to make finding rental homes in Nairobi easier and more convenient.
- House hunters can browse, search, filter, sort, view, and save properties. Landlords can create accounts and manage their own property listings. The application uses session-based authentication and role-based authorization to protect user data and actions.

## Technologies Used

### Frontend
- React
- Vite
- JavaScript
- React Router
- CSS

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Marshmallow
- Flask-Bcrypt
- Flask-CORS
- Gunicorn

### Database
- PostgreSQL

### Deployment
- Vercel - Frontend
- Render - Backend and PostgreSQL database

### Development Tools
- Git
- GitHub
- npm
- Pipenv

## Setup and Run Instructions

### 1. Clone the repository

```bash
git clone ([[https://github.com/Celline-SD17/Nairobi-House-Hunt ]])
cd client
```

## Backend Setup

### 2. Navigate to the server directory

```bash
cd server
```

### 3. Install Python dependencies

Using Pipenv:

```bash
pipenv install
pipenv shell
```

Alternatively:

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
FLASK_ENV=development
```

Do not commit the `.env` file or other files containing secrets to GitHub.

### 5. Run database migrations

```bash
flask db upgrade head
```

### 6. Seed the database

```bash
python seed.py
```

- The seed script creates sample users, properties, and favorites for development and testing.

### 7. Start the Flask server

```bash
flask run
```

- The backend will normally run at:

```text
http://localhost:5000
```

## Frontend Setup

### 8. Navigate to the client directory

- Open a new terminal and run:

```bash
cd Nairobi-House-Hunt
```

### 9. Install frontend dependencies

```bash
npm install
```

### 10. Configure the frontend API URL

Create a `.env` file inside the `Nairobi-House-Hunt` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 11. Start the React application

```bash
npm run dev
```

- The frontend will normally be available at:

```text
http://localhost:5173
```

## Core Functionality

### House Hunters

- House hunters can:
    * Create an account and log in.
    * Browse available properties.
    * Search properties by title, location, area, or property type.
    * Filter properties by number of bedrooms.
    * Filter properties by maximum price.
    * Sort properties by price.
    * View detailed property information.
    * View landlord contact information.
    * Add properties to favorites.
    * Remove properties from favorites.
    * Add and edit notes on favorite properties.
    * Browse properties using pagination.
    * View and update their account information.
    * Change their password.
    * Delete their account.
- When a hunter's account is celeted, their favorites are deleted too due to the database relationship cascade. 
### Landlords

- Landlords can:

    * Create a landlord account.
    * Provide and update their email address and phone number.
    * Log in using session-based authentication.
    * View their own property listings.
    * Add new properties.
    * Edit their own properties.
    * Delete their own properties.
    * Update their account information.
    * Change their password.
    * Delete their account.

- When a landlord account is deleted, the landlord's associated properties are also removed through the database relationship cascade.

### Authentication and Authorization

- The application uses Flask session-based authentication.

* Users receive a session after successfully logging in or signing up.
* Protected routes require an authenticated session.
* Role-based authorization restricts landlord and house-hunter actions.
* Landlords can manage only their own property listings.
* House hunters can manage only their own favorites.
* Users can update or delete only their own accounts.
* Passwords are stored as password hashes rather than plain text.

### Account Management

- Authenticated users can access the Account section from the navigation bar.

- Users can:

    * View their account details.
    * Update their username.
    * Change their password.
    * Landlords can also update their email and phone number.
    * Delete their account after confirmation.
    * Log out of the application.

### Property Management

- Property listings contain information including:

* Title
* Price
* Currency
* Location
* County
* City
* Area
* Bedrooms
* Bathrooms
* Property type
* Description
* Landlord

### Favorites

- House hunters can save properties to a personalized favorites list.
- Favorites support:

    * Adding a property.
    * Viewing saved properties.
    * Updating notes.
    * Removing a property.

- Each house hunter has access only to their own favorites.

### Pagination

- The properties endpoint supports pagination to make it easier to browse larger collections of properties.

- Example:

```text
GET /properties?page=1&per_page=10
```

- Pagination information includes:

* Current page
* Items per page
* Total number of properties
* Total number of pages
* Whether a next page exists
* Whether a previous page exists


## API Endpoints

- The Flask backend provides RESTful endpoints for authentication, properties, account management, and favorites.

### General

| Method | Endpoint | Description                      | Access |
| ------ | -------- | -------------------------------- | ------ |
| GET    | `/`      | Confirms that the API is running | Public |

### Authentication

| Method | Endpoint         | Description                                    | Access        |
| ------ | ---------------- | ---------------------------------------------- | ------------- |
| POST   | `/signup`        | Creates a new house hunter or landlord account | Public        |
| POST   | `/login`         | Authenticates a user and creates a session     | Public        |
| GET    | `/check_session` | Checks the currently authenticated session     | Public        |
| DELETE | `/logout`        | Clears the current user's session              | Authenticated |

### Properties

| Method | Endpoint           | Description                                                                | Access        |
| ------ | ------------------ | -------------------------------------------------------------------------- | ------------- |
| GET    | `/properties`      | Returns a paginated list of properties with search, filtering, and sorting | Public        |
| GET    | `/properties/<id>` | Returns detailed information about a specific property                     | Authenticated |
| POST   | `/properties`      | Creates a new property listing                                             | Landlord      |
| GET    | `/my-properties`   | Returns properties belonging to the authenticated landlord                 | Landlord      |
| PATCH  | `/properties/<id>` | Updates a property owned by the authenticated landlord                     | Landlord      |
| DELETE | `/properties/<id>` | Deletes a property owned by the authenticated landlord                     | Landlord      |

### Account Management

| Method | Endpoint   | Description                                                     | Access        |
| ------ | ---------- | --------------------------------------------------------------- | ------------- |
| PATCH  | `/account` | Updates the authenticated user's account details                | Authenticated |
| DELETE | `/account` | Deletes the authenticated user's account and associated records | Authenticated |

### Favorites

| Method | Endpoint          | Description                                           | Access       |
| ------ | ----------------- | ----------------------------------------------------- | ------------ |
| POST   | `/favorites`      | Adds a property to the authenticated user's favorites | House Hunter |
| GET    | `/favorites`      | Returns the authenticated user's favorites            | House Hunter |
| GET    | `/favorites/<id>` | Returns a specific favorite                           | House Hunter |
| PATCH  | `/favorites/<id>` | Updates notes for a favorite                          | House Hunter |
| DELETE | `/favorites/<id>` | Removes a favorite                                    | House Hunter |

### Example API Request

- Retrieve the first page of properties with ten properties per page:

```text
GET /properties?page=1&per_page=10
```

- Example search and filtering request:

```text
GET /properties?search=Westlands&bedrooms=2&max_price=50000&sort=price-low
```

---

## Project Structure

```text
client/
│
├── Nairobi-House-Hunt/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── server/
│   ├── migrations/
│   ├── app.py
│   ├── configs.py
│   ├── models.py
│   ├── schema.py
│   ├── seed.py
│   ├── requirements.txt
│   ├── Pipfile
│   └── Pipfile.lock
│
└── README.md
```

## Deployment

### Frontend

- The React frontend is deployed on Vercel:

https://nairobi-house-hunt.vercel.app/ 

### Backend API

- The Flask backend is deployed on Render:

https://nairobi-house-hunt-api.onrender.com 

- The backend uses a PostgreSQL database hosted through Render.

### Production Environment Variables

The backend uses:

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
FLASK_ENV=production
```

- The frontend uses:

```env
VITE_API_URL=https://nairobi-house-hunt-api.onrender.com
```

- Environment variables containing secrets should never be committed to the repository.
