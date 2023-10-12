import React from "react";

function MovieCard({ title, duration, thumbnail, onClick }) {
  // Format the duration (in seconds) to HH:MM:SS format
  const formattedDuration = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <div
      className="p-4 cursor-pointer w-80 border-2 border-gray-400 hover:border-gray-600 transition duration-150 rounded-md shadow-lg"
      onClick={onClick}
    >
      <div className="relative rounded-md overflow-hidden">
        {/* Use the thumbnail URL as the image */}
        <img className="w-full h-64 object-cover" src={thumbnail} alt={title} />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
          <span className="text-5xl text-white">▶️</span>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-4 mb-1 border-b border-gray-300 pb-1">
        {title}
      </h2>{" "}
      {/* Increased font-size and added divider */}
      <div className="border-r border-gray-300 my-2"></div>{" "}
      {/* Added extra divider */}
      <p className="mt-1 ">{`Duration : ${formattedDuration}`}</p>
    </div>
  );
}

export default MovieCard;
