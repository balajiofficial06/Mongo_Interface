# FastAPI Backend and React Frontend Integration

This project demonstrates how to integrate a FastAPI backend with a React frontend to build a full-stack web application.

## Prerequisites

Before setting up the project, ensure that you have the following installed on your system:

- [Python](https://www.python.org/downloads/) (3.x recommended)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup Instructions

Follow these steps to set up the FastAPI backend and React frontend:

### Backend (FastAPI)

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```


2. Create a virtual environment (optional but recommended):

    ```bash
    python3 -m venv venv
    ```


5. Install the required Python packages:

    ```bash
    pip install -r requirement.txt
    ```
    or use
   
    ```bash
    pip install fastapi uvicorn PyJWT pydantic pymongo motor pydantic_settings passlib
    ```

7. Run the FastAPI server:

    ```bash
    py main.py
    ```

8. Run the 

   The backend server should now be running on `http://localhost:8000`.

### Frontend (React)

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run start
    ```

   The frontend development server should now be running on `http://localhost:3000`.

### DATABASE SETUP

#### This step is optional in case of database change

1. you can find the database and other configuration in /core/config.py. 

2. you can run with the pre-existing mongoURL for simple setup

## Project Structure

- **This Folder**: Contains the FastAPI backend code.
- **frontend/**: Contains the React frontend code.
- **README.md**: Instructions and information about the project.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

Not Licensed

## Acknowledgments

- FastAPI: A modern, fast (high-performance), web framework for building APIs with Python 3.7+.
- React: A JavaScript library for building user interfaces.
- Uvicorn: A lightning-fast ASGI server, built on uvloop and httptools.
