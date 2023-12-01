[![wakatime](https://wakatime.com/badge/user/d7fffb39-631e-454c-9cce-bb60e92d14c5/project/018b20f9-a76c-4861-a606-5f22ee83109d.svg)](https://wakatime.com/badge/user/d7fffb39-631e-454c-9cce-bb60e92d14c5/project/018b20f9-a76c-4861-a606-5f22ee83109d)

# Local Movie Streamer

Stream your local movies through a beautiful web interface. Local Movie Streamer, a MERN application, allows you to search through your movie collection, watch them, add subtitles, and control the stream from any device connected to your local network.

![Landing Page](https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/intro2.gif?raw=true)



## V1.0 Stable
Added TMDB API Points to fetch trending movies and tv series using react query, optimized the UI for the application for more check the screenshots below.


## Features

- **Local Streaming**: Stream videos stored on your local machine using WebSockets for seamless video streaming.
- **Device Control**: Control and access the stream from any device on your local network.
- **Authentication**: Secure login and sign-up pages have been integrated.
- **Subtitles**: Upload SRT subtitle files while watching a movie.
- **Responsive**: Can be accessed on various device sizes using Tailwind CSS.
- **Browse All types of Movies and TV Shows** : the ability to view and browse trending movies, popular high-rated etc using the TMDB API Service.

## Technology Stack

- **MERN Stack**: MongoDB, Express.js, React.js, and Node.js.
- **Streaming**: WebSockets.
- **Authentication**: bcrypt (for password hashing) and JWT (for user authentication).

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
   npm install

   # Backend dependencies
   cd ../backend
   npm install
   ```

### Configuration

- Create a directory and add your movies to it.
- Change the backend directory to point to your folder from the `server.js` file.
- Modify the IP address in the server configuration to your local IP address if needed.
- File structure:
  ![file struct Image](https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/file_stru.JPG?raw=true)

#### Backend

- Navigate to the `backend` directory.
- Edit the `movieDirectory` variable in `server.js` to point to your local movie directory.

#### Frontend

- Modify the API endpoints if needed to point to the correct backend server by using env variables.

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
  npm start
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

- Open your web browser and visit `http://localhost:5173` or the configured IP address.
- If you're a new user, sign up. Otherwise, log in and enjoy streaming your local movies!

## Usage

- Search for movies using the search bar.
- Click on any movie card to start streaming.
- Upload `.srt` subtitle files directly while watching a movie.

## Contributing

Feel free to contribute to this project! Fork the repository, make your changes, and submit a pull request.

## Screenshots

<img  src="https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/intro.gif?raw=true" width ="500px"/>
<img  src="https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/intro2.gif?raw=true" width ="500px"/>
<img  src="https://github.com/sulimanbadour1/local-stream-app/blob/main/screenshots/intro3.gif?raw=true" width ="500px"/>

## License

MIT License
