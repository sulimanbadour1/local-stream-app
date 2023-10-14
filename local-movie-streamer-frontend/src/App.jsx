import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Logo from "../public/logo.png";

import { io } from "socket.io-client"; // Import socket.io client

function App() {
  const SERVER_IP = "192.168.1.100"; // Define the server IP address here
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [subtitleFile, setSubtitleFile] = useState(null);
  const [subtitleUploaded, setSubtitleUploaded] = useState(false);
  const [subtitleName, setSubtitleName] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${SERVER_IP}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("control-message", (data) => {
      console.log("Received control message:", data);
    });
  }, [socket]);

  useEffect(() => {
    fetch(`http://${SERVER_IP}:3001/api/movies`)
      .then((response) => response.json())
      .then(async (movieList) => {
        const metadataPromises = movieList.map((movie) =>
          fetch(
            `http://${SERVER_IP}:3001/api/movies/${encodeURIComponent(
              movie
            )}/metadata`
          ).then((res) => res.json())
        );
        const metadataList = await Promise.all(metadataPromises);
        const moviesWithMetadata = movieList.map((movie, index) => ({
          name: movie,
          ...metadataList[index],
        }));
        setMovies(moviesWithMetadata);
        setFilteredMovies(moviesWithMetadata);
      });
  }, []);

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const results = movies.filter((movieData) =>
      movieData.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMovies(results);
  }

  function srtToVtt(srtContent) {
    const vttContent =
      "WEBVTT\n\n" + srtContent.replace(/(\d+)\,(\d+)/g, "$1.$2");
    return new Blob([vttContent], { type: "text/vtt" });
  }

  function handleSubtitleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith(".srt")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const vttBlob = srtToVtt(e.target.result);
          const objectURL = URL.createObjectURL(vttBlob);
          setSubtitleFile(objectURL);
          setSubtitleUploaded(true);
          setSubtitleName(file.name);
        };
        reader.readAsText(file);
      } else if (file.name.endsWith(".vtt")) {
        const objectURL = URL.createObjectURL(file);
        setSubtitleFile(objectURL);
        setSubtitleUploaded(true);
        setSubtitleName(file.name);
      } else {
        alert("Unsupported subtitle format. Please upload SRT or VTT files.");
      }
    }
  }

  useEffect(() => {
    return () => {
      if (subtitleFile) {
        URL.revokeObjectURL(subtitleFile);
      }
    };
  }, [subtitleFile]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mt-10 mb-8 font-semibold">
        Local Movie Streamer 🎥
      </h1>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for movies..."
          className="pl-10 p-2 w-full rounded-lg border shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
      <div className={`flex flex-wrap gap-6 ${currentMovie ? "blur-md" : ""}`}>
        {filteredMovies.map((movieData) => (
          <MovieCard
            key={movieData.name}
            title={movieData.name}
            duration={movieData.duration}
            thumbnail={`http://${SERVER_IP}:3001/api/movies/${encodeURIComponent(
              movieData.name
            )}/thumbnail`}
            onClick={() => setCurrentMovie(movieData.name)}
          />
        ))}
      </div>

      {currentMovie && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg relative w-3/4 h-auto">
            <button
              className="absolute -top-[-10px] right-[-10px] bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none"
              onClick={() => setCurrentMovie(null)}
            >
              ✖️
            </button>
            <h2 className="text-2xl mb-4">Now Playing: {currentMovie}</h2>
            <div className="flex items-center justify-between mt-4 space-x-4">
              <label className="bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-indigo-600 mt-4 md:mt-0">
                Upload Subtitle
                <input
                  type="file"
                  onChange={handleSubtitleUpload}
                  accept=".srt,.vtt"
                  className="hidden"
                />
              </label>
              <a
                href="https://subscene.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 mt-4 md:mt-0"
              >
                Download Subtitle
              </a>
              {subtitleUploaded && (
                <span className="text-base bg-green-200 p-1 rounded">
                  {subtitleName} uploaded!
                </span>
              )}
            </div>
            <video
              controls
              width="100%"
              src={`http://${SERVER_IP}:3001/api/movies/${encodeURIComponent(
                currentMovie
              )}`}
              className="shadow-inner mt-4"
            >
              {subtitleFile && (
                <track
                  kind="subtitles"
                  src={subtitleFile}
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
          </div>
        </div>
      )}

      <div
        className="sticky bottom-1 mx-auto w-16 h-16 md:h-16 md:w-16 bg-black rounded-full filter  grayscale-100
              hover:bg-gray-500  transition-all duration-300 ease-in-out"
      >
        <img
          className="w-16 h-16 md:h-16 md:w-16 object-contain rounded-full mx-auto"
          src={Logo}
          alt="logo"
        />
      </div>
      <p className="text-xl rounded-full flex items-center text-center justify-center p-8">
        Made with ❤️ by Suliman &copy; Oct 2023
      </p>
    </div>
  );
}

export default App;
