# AirBrB

## Introduction

**AirBrB** is a frontend project built with ReactJS and MUI component library. It is a single page web application that provides an online marketplace for short- and long-term homestays and experience.

## Setup and Installation

### The Frontend

Navigate to the `frontend` folder and run `npm install` to install all of the dependencies necessary to run the ReactJS app. Then run `npm start` to start the app.

### The Backend

Run `npm install` in `backend` directory once.

To run the backend server, simply run `npm start` in the `backend` directory. This will start the backend.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.js`. You can change the port in this file.

## Features

- Home page
  - Login
  - Register
- Host Listing Management
  - Create
  - Edit
  - Publish
  - Unpublish
  - View Bookings Requests and History
- Customer Landing Page
  - Homestays Listings Screen
  - Search Filters
- Listing Page
  - Viewing Listing
  - Making a booking
  - Leaving a review
