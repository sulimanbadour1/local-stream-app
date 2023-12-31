import React, { useState, useEffect, useRef, useContext } from "react";
// import Logo from "../src/assets/logo.png";

import Play from "../assets/icons/play.png";
import Pause from "../assets/icons/pause.png";
import VolumeUp from "../assets/icons/up.png";
import VolumeDown from "../assets/icons/down.png";
import Close from "../assets/icons/close.png";
import Cast from "../assets/icons/broadcast.png";
import fullscreen from "../assets/icons/fullscreen.png";
import { io } from "socket.io-client";
import Card2 from "../components/Card2";

import { UserContext } from "../../context/UserContext";
// Animation
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Anim from "../assets/anim/anim2.json";
import { Link } from "react-router-dom";

// Animation
const Main = () => {
  // change the IP address to your local IP address
  // const SERVER_IP = "192.168.1.100";
  const SERVER_IP = import.meta.env.VITE_IP_ADDRESS;
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [subtitleFile, setSubtitleFile] = useState(null);
  const [subtitleUploaded, setSubtitleUploaded] = useState(false);
  const [subtitleName, setSubtitleName] = useState("");
  const [socket, setSocket] = useState(null);
  const videoRef = useRef(null); // Reference to the video element

  // set up socket connection

  useEffect(() => {
    const newSocket = io(`http://${SERVER_IP}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("control-message", (data) => {
      switch (data.command) {
        case "play":
          document.querySelector("video").play();
          break;
        case "pause":
          document.querySelector("video").pause();
          break;
        case "close":
          setCurrentMovie(null);
          break;
        case "volume-up":
          const videoElement = document.querySelector("video");
          if (videoElement.volume < 1) {
            videoElement.volume += 0.1;
          }
          break;
        case "volume-down":
          const video = document.querySelector("video");
          if (video.volume > 0) {
            video.volume -= 0.1;
          }
          break;
        case "open-player":
          const requestedMovie = data.movieName;
          setCurrentMovie(requestedMovie);
          break;
        case "toggle-fullscreen":
          toggleFullScreen();
          break;
        default:
          break;
      }
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

  // Function to send control commands to the server
  const sendControlCommand = (command, data) => {
    if (socket) {
      socket.emit("control-message", { command, ...data });
    }
  };

  // Function to open the video player on the remote device
  const openVideoPlayerOnRemote = (movieName) => {
    sendControlCommand("open-player", { movieName });
  };

  // Function to toggle fullscreen
  function toggleFullScreen() {
    const videoElement = document.querySelector("video");
    if (!document.fullscreenElement) {
      videoElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // context is used to get the user object
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <main className="min-h-screen ">
        <div className="container mx-auto px-8 max-w-7xl max-h-screen">
          <h1 className="text-2xl mt-10 mb-2 font-semibold text-center">
            Local Movie Streamer 🎥
          </h1>
          <p className=" mb-2 mt-2 font-normal text-center ">
            A plarform to stream your videos from your local machine to any
            device. <br />
            <span className="font-semibold">Scan, Stream and Enjoy 🎉</span>
          </p>

          <div className="-mt-10">
            <Player
              autoplay
              loop={true}
              src={Anim}
              style={{
                height: "330px",
                width: "290px",
                zIndex: 1,
              }}
              className="flex justify-center items-center 
              text-center scale-75 lg:scale-100"
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
            <a href="/login">
              <button
                type="submit"
                className="flex justify-center mt-2 w-1/2 mx-auto rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6
             text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </a>

            <p className="mt-4 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="/register"
                className="font-semibold leading-6 text-blue-500 hover:text-indigo-500"
              >
                Sign up now
              </a>
            </p>
            <p className="mt-8 text-center text-sm text-gray-500">
              Additonally, you can also check out our movies & series API
            </p>
            <Link to="/movie_series">
              <button
                className="flex justify-center m-4 w-fit mx-auto rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6
             text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Movies & Series API
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-8 max-w-7xl max-h-screen">
        <h1 className="text-2xl mt-10 mb-2 font-semibold pl-12">
          Local Movie Streamer 🎥
        </h1>
        <h1 className=" inline-flex text-base mt-1 mb-4 font-semibold pl-12">
          Welcome back ,{"     "}
          {user && (
            <span className="text-blue-500  text-base uppercase">
              {"  "} {user.name}
            </span>
          )}
        </h1>

        <div className="relative mb-8 pl-12 pr-8">
          <input
            type="text"
            placeholder="Search for movies..."
            className="pl-12 p-2 w-full rounded-lg cursor-pointer border shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
           focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pl-12">
            🔍
          </span>
        </div>
        <div
          className="text-xl font-bold pb-8 capitalize pl-12
          animate-text-gradient bg-gradient-to-r from-[#853232] via-[#5785c9] to-[#e90e0a] 
          bg-[200%_auto] bg-clip-text text-transparent"
        >
          your local files
        </div>

        {user && (
          <div
            className={`flex flex-wrap pl-12 pb-32 gap-1 ${
              currentMovie ? "blur-md" : ""
            }`}
          >
            {filteredMovies.map((movieData) => (
              <Card2
                key={movieData.name}
                title={movieData.name}
                duration={movieData.duration}
                thumbnail={`http://${SERVER_IP}:3001/api/movies/${encodeURIComponent(
                  movieData.name
                )}/thumbnail`}
                onClick={() => {
                  setCurrentMovie(movieData.name); // Open locally
                }}
                onPlayRemote={() => openVideoPlayerOnRemote(movieData.name)}
              />
            ))}
          </div>
        )}

        {currentMovie && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white/60 p-4 rounded-lg shadow-lg relative w-3/4 h-auto">
              <button
                className="absolute top-[-20px] right-[-30px] bg-red-600 text-white px-3 py-1.5 rounded-lg focus:outline-none 
              cursor-pointer hover:bg-red-800"
                onClick={() => setCurrentMovie(null)}
              >
                <img src={Close} alt="close" className="w-8 h-8" />
              </button>
              <h2 className="text-sm md:text-base font-semibold mb-6 mt-1 text-center">
                Now Playing: {currentMovie.split("\\").pop()}
              </h2>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <label
                  className="bg-black text-white px-4 py-2 rounded cursor-pointer
               hover:bg-slate-500 mt-4 md:mt-0 text-xs md:text-base"
                >
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
                  className="bg-black text-white px-4 py-2 rounded cursor-pointer
                 hover:bg-slate-500 mt-4 md:mt-0
                 text-xs md:text-base"
                >
                  Download Subtitle
                </a>
                {subtitleUploaded && (
                  <span className=" bg-green-200 p-1 rounded text-xs md:text-base">
                    {subtitleName} uploaded!
                  </span>
                )}
              </div>
              <video
                ref={videoRef} // Use the same video element for both devices
                controls
                width="100%"
                src={`http://${SERVER_IP}:3001/api/movies/${encodeURIComponent(
                  currentMovie
                )}`}
                className="shadow-inner mt-8 mb-8 justify-center 
              items-center flex mx-auto w-96 md:w-1/2 h-auto"
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
              <div>
                <p className="text-sm flex items-center text-center justify-center md:text-2xl p-2">
                  Remote Control{" "}
                </p>
                <span className="text-xs flex font-bold items-center uppercase text-center justify-center pb-2">
                  {" "}
                  Control client B
                </span>
                <div className="flex items-center justify-center gap-2 mt-4 mb-4 ">
                  <button
                    onClick={() => openVideoPlayerOnRemote(currentMovie)}
                    className="bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500 mt-4 md:mt-0"
                  >
                    <img src={Cast} alt="broadcast" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => sendControlCommand("pause")}
                    className="bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500 mt-4 md:mt-0"
                  >
                    <img src={Pause} alt="pause" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => sendControlCommand("play")}
                    className="bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500 mt-4 md:mt-0"
                  >
                    <img src={Play} alt="play" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => sendControlCommand("volume-down")}
                    className="bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500 mt-4 md:mt-0"
                  >
                    <img
                      src={VolumeDown}
                      alt="volume-down"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    onClick={() => sendControlCommand("volume-up")}
                    className="bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500 mt-4 md:mt-0"
                  >
                    <img src={VolumeUp} alt="volume-up" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => sendControlCommand("close")}
                    className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-700 mt-4 md:mt-0"
                  >
                    <img src={Close} alt="close" className="w-6 h-6" />
                  </button>
                  {/* <button
                    onClick={() => sendControlCommand("toggle-fullscreen")}
                    className="bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500 mt-4 md:mt-0"
                  >
                    <img
                      src={fullscreen}
                      alt="fullscreen"
                      className="w-6 h-6"
                    />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
