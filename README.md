# Nairobi House Hunt

- Nairobi House Hunt is a full-stack property search application designed to make finding rental homes in Nairobi simpler and more convenient.

- The application allows house hunters to search, filter, sort, view, and save rental properties as favorites. Landlords can create accounts and manage their own property listings.

## Technologies Used

### Frontend
- React
- Vite
- React Router
- JavaScript
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
- Pipenv
- npm

## Setup and Run Instructions

### 1. Clone the repository

```
git clone ([[https://github.com/Celline-SD17/Nairobi-House-Hunt]])
cd Nairobi-House-Hunt
```

## Backend Setup

### 
- Navigate to the server directory

```
cd server
```

### 3. Install Python dependencies

Using Pipenv:

```bash
pipenv install
pipenv shell
```

Or using the requirements file:

```
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory.

```
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
```

The database URL should point to the PostgreSQL database being used by the application.

### 5. Run database migrations

```
flask db upgrade
```

### 6. Seed the database

```bash
python seed.py
```

The seed script populates the database with sample users, landlords, properties, and favorites for development and testing.

### 7. Start the Flask backend

```bash
flask run
```

The backend will run locally at:

```
http://localhost:5000
```

---

## Frontend Setup

### 8. Open a new terminal and navigate to the client directory

```bash
cd Nairobi-House-Hunt
```

### 9. Install JavaScript dependencies

```bash
npm install
```

### 10. Configure the frontend API URL

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 11. Start the React application

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Core Functionality

### House Hunters

House hunters can:

    * Create an account and log in using session-based authentication.
    * Search properties by location, area, city, or property title.
    * Filter properties by number of bedrooms.
    * Set a maximum monthly rental price.
    * Sort properties by price.
    * View detailed information about a property.
    * View landlord contact information for a property.
    * Add properties to their favorites.
    * Remove properties from their favorites.
    * Add and edit notes on saved properties.
    * Browse properties using pagination.

### Landlords

Landlords can:

* Create a landlord account with email and phone information.
* Log in securely.
* View properties belonging to their account.
* Add new property listings.
* Edit their own property listings.
* Delete their own property listings.

### Authentication and Authorization

The application uses session-based authentication and role-based authorization.

* Unauthenticated users can browse available properties.
* Full property details require authentication.
* Only house hunters can manage favorites.
* Landlords can manage only their own property listings.
* Protected operations require an authenticated session.

### Property Management

Property listings contain information such as:

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

### Pagination

The properties endpoint uses pagination so users can browse listings in manageable pages.

Example:

```text
GET /properties?page=1&per_page=10
```

The response includes pagination information such as:

* Current page
* Number of items per page
* Total number of properties
* Total number of pages
* Whether a next page exists
* Whether a previous page exists

## Project Structure

```text
Client/
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

The React frontend is deployed with Vercel:

https://nairobi-house-hunt-git-main-celline-sd17s-projects.vercel.app/

### Backend API

The Flask backend is deployed with Render:

https://nairobi-house-hunt-api.onrender.com

The backend uses a managed Render PostgreSQL database.

## Environment Variables

### Backend

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
```

### Frontend

```
- VITE_API_URL=your_backend_url
- Environment files containing secrets or local configuration should not be committed to GitHub.
```

