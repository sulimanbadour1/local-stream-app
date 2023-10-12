import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [subtitleFile, setSubtitleFile] = useState(null); // Added subtitleFile state
  const [subtitleUploaded, setSubtitleUploaded] = useState(false);
  const [subtitleName, setSubtitleName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/movies")
      .then((response) => response.json())
      .then(async (movieList) => {
        const metadataPromises = movieList.map((movie) =>
          fetch(`http://localhost:3001/api/movies/${movie}/metadata`).then(
            (res) => res.json()
          )
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

  // Added subtitle conversion function
  function srtToVtt(srtContent) {
    const vttContent =
      "WEBVTT\n\n" + srtContent.replace(/(\d+)\,(\d+)/g, "$1.$2");
    return new Blob([vttContent], { type: "text/vtt" });
  }
  // subtitle event handler start
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
  // subtitile event handler end
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mt-10 mb-8 font-semibold">
        Local Movie Streamer
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
            thumbnail={`http://localhost:3001/api/movies/${encodeURIComponent(
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
              className="absolute top-[-10px] right-[-10px] bg-red-600 text-white px-2 py-1 rounded-full focus:outline-none"
              onClick={() => setCurrentMovie(null)}
            >
              ✖️
            </button>
            <h2 className="text-2xl mb-4">Now Playing: {currentMovie}</h2>
            <div className="flex items-center justify-between mt-4">
              <label className="bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-indigo-600">
                Upload Subtitle
                <input
                  type="file"
                  onChange={handleSubtitleUpload}
                  accept=".srt,.vtt"
                  className="hidden"
                />
              </label>
              {subtitleUploaded && (
                <span className="text-base bg-green-200 p-1 rounded">
                  {subtitleName} uploaded!
                </span>
              )}
            </div>
            <video
              controls
              width="100%"
              src={`http://localhost:3001/api/movies/${currentMovie}`}
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
    </div>
  );
}

export default App;
