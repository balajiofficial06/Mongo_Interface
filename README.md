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

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Create a virtual environment (optional but recommended):

    ```bash
    python3 -m venv venv
    ```

4. Activate the virtual environment:

    - On Windows:

    ```bash
    venv\Scripts\activate
    ```

    - On macOS/Linux:

    ```bash
    source venv/bin/activate
    ```

5. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

6. Run the FastAPI server:

    ```bash
    uvicorn main:app --reload
    ```

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
    npm start
    ```

   The frontend development server should now be running on `http://localhost:3000`.

## Project Structure

- **backend/**: Contains the FastAPI backend code.
- **frontend/**: Contains the React frontend code.
- **README.md**: Instructions and information about the project.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FastAPI: A modern, fast (high-performance), web framework for building APIs with Python 3.7+.
- React: A JavaScript library for building user interfaces.
- Uvicorn: A lightning-fast ASGI server, built on uvloop and httptools.
