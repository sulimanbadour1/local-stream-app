# Local Movie Streamer

Stream your local movies through a beautiful web interface. Local Movie Streamer allows you to search through your movie collection, watch them, and even add subtitles!

![Demo Image](demo-image.jpg)

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

#### Backend

- Navigate to the `backend` directory.
- Edit the `movieDirectory` variable in `server.js` to point to your local movie directory.

#### Frontend

No specific configuration needed.

### Running the Application

### Create a direrctory and add your movies to it.

## Change the backend dir to your folder from the server.js file.

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

**Note**: Don't forget to replace placeholders (like `[your-repo-link]` and `[your-repo-folder]`) with actual values. Also, you might want to add a `demo-image.jpg` or any relevant image to make your README visually appealing.

This README provides a good start, but you might also want to add sections like **FAQ**, **Known Issues**, and **Change Log** depending on the maturity and complexity of your project.
