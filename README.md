# Code_Summarization_LLM

# Documentation

## Overview
This project showcases a comprehensive web application, utilizing Python for the backend, React.js for the frontend, and SQLite as the database. The application includes robust user authentication features, including user registration, email verification, a profile dashboard, and password reset functionality. Additionally, it incorporates an autonomous AI tool leveraging Large Language Models (LLMs) to generate concise code summaries, enhancing code comprehension without user intervention. 


## Table of Contents
1. [Backend (Flask)](#backend-flask)
   - [Prerequisites](#prerequisites-backend)
   - [Installation](#installation-backend)
   - [Running the Backend](#running-the-backend)
   - [API Endpoints](#api-endpoints)

2. [Frontend (React)](#frontend-react)
   - [Prerequisites](#prerequisites-frontend)
   - [Installation](#installation-frontend)
   - [Running the Frontend](#running-the-frontend)

3. Demonstration Video
   

## Backend (Flask)

### Prerequisites Backend
Make sure you have the following installed on your machine:
- Python

### Installation Backend
1. Clone repository:

   ```bash
   https://github.com/GabruAru/Code_Summarization_LLM.git
   ``````
2. Navigate to the backend directory:

    ```bash
    cd backend
    ```
3. Create a virtual environment:    

    ```bash
    python -m venv venv
    ```
4.  Activate the virtual environment:

    On Windows:
    ```bash
    .\venv\Scripts\activate
    ```
    
     On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   
### Running the Backend  

1. Set up environment variables if required.
   
   Create a file named `.env` in the root directory of your Flask application. This file will      store your environment variables.

   Open the `.env` file and define the required environment variables. For example:

   ```env
   GOOGLE_API_KEY=your_google_api_key
   ```
2. Run the Flask application:

   ```bash
   python app.py
   ```
   The backend should be accessible at http://localhost:5000.

### API Endpoints

1.  Registers a New User: `POST /register`

2.  Login: `POST /login`

3.  Get User Profile `GET /profile`

4.  Logout `POST /logout`

5.  Edit User Profile `PUT /edit`

6.  Chat and Summarization `POST /chat`

## Frontend (React)

### Prerequisites Backend
Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation Frontend
1. Navigate to the frontend directory:
   ```bash
   cd app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```   

### Running the Frontend 
1. Start the React development server:
   ```bash
   npm start
   ```
   The frontend should be accessible at http://localhost:3000.

## Demonstration Video



https://github.com/GabruAru/Code_Summarization_LLM/assets/84130891/5c4ce0c1-4c0c-47a9-aff0-2ae28fcfb460

