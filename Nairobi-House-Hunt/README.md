# Nairobi House Hunt
## Description
- Nairobi House Hunt is a React-based house search application designed to make finding homes in Nairobi simpler and more convenient.
- The application fetches real property listing data, and allows users to search, filter, and sort available rental properties based on their preferences.
## Features
* Browse rental properties in Nairobi.
* Search properties by location, area, city, or title.
* Filter properties by number of bedrooms.
* Filter properties by maximum monthly rent.
* Sort properties by price.
* Add properties to favorites.
* Remove properties from favorites
* View the original property listing
* User login and signup interfaces.
* Responsive and user-friendly interface.

## Data Source
- In this phase, this App fetches property listings from BuyRentKenya property scraper through Apify.
- The link to the API is ([[https://api.apify.com/v2/actors/nomad-agent~buyrentkenya-scraper/runs/last/dataset/items]])
**To access the data, one must create an account to be provided with a private token.**
- The application uses the following property information:
    * Title
    * Price
    * Currency
    * Location
    * County
    * City
    * Area
    * Number of bedrooms
    * Number of bathrooms
    * Property type
    * Original listing URL
## Technologies Used
- React
- JavaScript
- HTML
- CSS
- React Router
- Vite
- Apify API

## Project Structure
```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   └── PropertyCard.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Properties.jsx
│   ├── About.jsx
│   ├── Login.jsx
│   └── Signup.jsx
│
├── App.jsx
├── App.css
└── index.css
```

## Getting Started

### 1. Prerequisites
    Make sure you have Node.js and npm installed.
### 2. Installation
    Clone the repository:
        - git clone ([[https://github.com/Celline-SD17/Nairobi-House-Hunt]])
### 3. Navigate into the project
    cd Nairobi-House-Hunt
### 4. Install dependencies
    npm install
### 5. Running the Application
    Start the development server: npm run dev
- The application will start at the local URL provided by Vite
### 6. Navigate the application pages.
     ## Home
    - Introduces Nairobi House Hunt and provides an overview of the application's purpose and features.
 
     ## Properties
    - Displays fetched rental properties and provides search, filtering, sorting, and favorites functionality. 

    ## About
    - Explains the problem the application addresses, the proposed Solution, and how the application works.

    ## Login and Signup
    - Provides the frontend interfaces for user authentication
## Searching, Filtering, and Sorting
- Users  can search properties using terms such as:
        * Location
        * Area
        * City
        * Property title
- Users can also filter properties by:
        * Number of bedrooms
        * Maximum monthly rent
- Properties can be sorted by:
        * Price: Low to High
        * Price: High to Low
## Favorites
- Users can add or remove houses to their favorites using the favorite button on each property card.
## Future Developments
- This project currently focuses on the front end.
- Future development will include a custom backend and database that will allow the application to support:
    * User authentication and authorization
    * Persistent user accounts
    * Persistent favorites
    * User profile management
    * CRUD operations
    * A custom property API
    * Additional property management functionality
    * The project should feature CRUD operations for a house owner once a database is developed, for house owners to add, update or delete properties in the app. 

    

