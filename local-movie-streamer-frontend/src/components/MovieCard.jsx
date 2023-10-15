import React from "react";
import PropTypes from "prop-types";

function MovieCard({ title, duration, thumbnail, onClick }) {
  const formattedDuration = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <article // Use semantic HTML
      className="p-4 cursor-pointer bg-white/10 w-44 md:w-80 border-1 border-gray-400 hover:border-gray-800 transition duration-150 rounded-lg shadow-2xl"
      onClick={onClick}
      tabIndex="0" // make it keyboard accessible
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <figure className="relative rounded-sm overflow-hidden">
        <img
          className="h-full md:h-64 object-fill"
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
          <span className="text-lg md:text-4xl text-white transform hover:scale-110 transition-transform duration-300">
            ▶️
          </span>
        </figcaption>
      </figure>
      <h2 className="text-xs md:text-lg font-normal md:font-bold mt-4 mb-1 border-b border-gray-300 pb-1">
        {title.split("\\").pop()}
      </h2>
      <div className="border-r border-gray-300 my-2"></div>
      <p className="mt-1 text-xs md:text-xl">{`Duration : ${formattedDuration}`}</p>
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
