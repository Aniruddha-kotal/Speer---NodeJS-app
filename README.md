# Project Overview

This project aims to create a secure and scalable RESTful API that allows users to manage notes. The application includes features such as creating, reading, updating, and deleting notes. Additionally, users can share notes with others and search for notes based on keywords.


<img align="right" alt="Coding" width="300" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDJhMTdzNDlpM3JzZWNqcWx4eDQ3NDc5aTc1bWxwNnppOHJ1ZDRhNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/hrSJkALVR79xkbbjih/giphy.gif">

## Technical Details

- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Rate Limiting:** Implemented for handling high traffic
- **Request Throttling:** Implemented to control request rates
- **Text Indexing:** Utilized for high-performance search functionality

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.
