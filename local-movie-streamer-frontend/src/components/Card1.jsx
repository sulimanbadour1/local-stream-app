import React from "react";
import PropTypes from "prop-types";
const Card1 = ({ title, duration, thumbnail, onClick }) => {
  const formattedDuration = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);
  return (
    <article
      onClick={onClick}
      tabIndex="0" // make it keyboard accessible
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      class="flex items-center p-2 cursor-pointer bg-slate-200 w-44 md:w-80 border- border-gray-400 hover:border-gray-800 transition duration-150 rounded-lg shadow-xl"
    >
      <div class="col-span-12 sm:col-span-2 md:col-span-3 p-2 mx-auto">
        <div class="w-full flex flex-col">
          <div class="relative mx-auto">
            <figure className="relative rounded-sm overflow-hidden">
              <img
                src={thumbnail}
                alt={title}
                onError={(e) => {
                  // handle failed image load
                  e.target.onerror = null;
                  e.target.src = "path/to/your/placeholder.jpg";
                }}
                loading="lazy" // lazy loading
                className="w-64 h-36 object-cover rounded-lg md:w-96 md:h-64"
              />
              <figcaption className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 hover:opacity-70 transition-opacity duration-300">
                <span className="text-lg md:text-4xl text-white transform hover:scale-110 transition-transform duration-300">
                  <img src="../src/assets/icons/play.png" alt="play" />
                </span>
              </figcaption>
            </figure>
            <p class="absolute right-2 bottom-2 rounded-lg bg-gray-900/80 text-gray-100 text-sm md:text-lg px-2 py-1">
              {formattedDuration}
            </p>
          </div>

          <div class="flex flex-row mt-8 gap-2">
            <div clas="flex flex-col">
              <p class="text-black text-sm md:text-lg font-medium mb-8">
                {title.split("\\").pop()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
// Prop types validation
Card1.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card1;
