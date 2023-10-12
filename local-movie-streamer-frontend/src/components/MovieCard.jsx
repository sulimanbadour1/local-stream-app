import React from "react";
import PropTypes from "prop-types";

function MovieCard({ title, duration, thumbnail, onClick }) {
  const formattedDuration = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <article // Use semantic HTML
      className="p-4 cursor-pointer w-80 border-2 border-gray-400 hover:border-gray-600 transition duration-150 rounded-md shadow-lg"
      onClick={onClick}
      tabIndex="0" // make it keyboard accessible
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <figure className="relative rounded-md overflow-hidden">
        <img
          className="w-full h-64 object-cover"
          src={thumbnail}
          alt={title}
          onError={(e) => {
            // handle failed image load
            e.target.onerror = null;
            e.target.src = "path/to/your/placeholder.jpg";
          }}
          loading="lazy" // lazy loading
        />
        <figcaption className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 hover:opacity-70 transition-opacity duration-300">
          <span className="text-5xl text-white transform hover:scale-110 transition-transform duration-300">
            ▶️
          </span>
        </figcaption>
      </figure>
      <h2 className="text-xl font-bold mt-4 mb-1 border-b border-gray-300 pb-1">
        {title}
      </h2>
      <div className="border-r border-gray-300 my-2"></div>
      <p className="mt-1">{`Duration : ${formattedDuration}`}</p>
    </article>
  );
}

// Prop types validation
MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;
