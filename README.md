# Local Movie Streamer

<img src="https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/app.gif?raw=true" width="100px"/>
Stream your local movies through a beautiful web interface. Local Movie Streamer allows you to search through your movie collection, watch them, and even add subtitles!

![Demo Image](https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/demo.JPG?raw=true)

## Features

- **Local Streaming**: Stream videos stored on your local machine.
- **Subtitles**: Upload SRT subtitle files while watching a movie.
- **Responsive**: Can be accessed on various device sizes.

## Technology Stack

- **Frontend**: React
- **Backend**: Express.js

## Prerequisites

- Node.js (v14+)
- Yarn or NPM
- Ffmpeg installed on your machine

## Getting Started

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sulimanbadour1/local-stream-app.git
   cd [your-repo-folder]
   ```

2. **Install dependencies:**

   ```sh
   # Frontend dependencies
   cd frontend
   yarn install

   # Backend dependencies
   cd ../backend
   yarn install
   ```

### Configuration

- Create a direrctory and add your movies to it.

- Change the backend dir to your folder from the server.js file.
- File structure:
  ![file struct Image](https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/file_stru.JPG?raw=true)

#### Backend

- Navigate to the `backend` directory.
- Edit the `movieDirectory` variable in `server.js` to point to your local movie directory.

#### Frontend

No specific configuration needed.

### Running the Application

- Create a direrctory and add your movies to it.

- Change the backend dir to your folder from the server.js file.

#### Backend

- Navigate to the `backend` directory.

  ```sh
  cd backend
  ```

- Start the server:

  ```sh
  yarn start
  node server.js
  ```

#### Frontend

- Navigate to the `frontend` directory.

  ```sh
  cd frontend
  ```

- Start the React app:

  ```sh
  npm run dev
  ```

### Accessing the App

- Open your web browser and visit `http://localhost:5173`.
- Enjoy streaming your local movies!

## Usage

- Search for movies using the search bar.
- Click on any movie card to start streaming.
- Upload `.srt` subtitle files directly while watching a movie.

## Contributing

Feel free to contribute to this project! Fork the repository, make your changes, and submit a pull request.

## License

MIT License

---
