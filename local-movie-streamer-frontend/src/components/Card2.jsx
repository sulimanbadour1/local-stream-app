/* eslint-disable react/prop-types */

const Card2 = ({ title, duration, thumbnail, onClick, onPlayRemote }) => {
  const formattedDuration = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);
  return (
    <article className="flex flex-col border border-opacity-10 rounded-md border-gray-400 pt-2 pb-0 shadow-lg">
      <div
        onClick={onClick}
        tabIndex="0" // make it keyboard accessible
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
        className="col-span-12 sm:col-span-6 md:col-span-3 m-2 justify-center items-center"
      >
        <div className="w-64 h-80 overflow-hidden">
          {" "}
          {/* Fixed width and height */}
          <div className="relative w-64 md:w-90">
            <figure className="relative rounded-sm overflow-hidden h-60 ">
              {" "}
              {/* Fixed height for the image container */}
              <img
                src={thumbnail}
                alt={title}
                onError={(e) => {
                  // handle failed image load
                  e.target.onerror = null;
                  e.target.src = "path/to/your/placeholder.jpg";
                }}
                loading="lazy" // lazy loading
                className="w-64 h-full object-cover md:w-90"
              />
              <figcaption className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer bg-black bg-opacity-30 hover:opacity-70 transition-opacity duration-300">
                <span className="text-lg text-white transform hover:scale-110 transition-transform duration-300">
                  <img
                    src="../src/assets/icons/play.png"
                    alt="play"
                    className="max-w-full"
                  />
                </span>
              </figcaption>
            </figure>

            <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py-1 whitespace-nowrap">
              {formattedDuration}
            </p>
          </div>
          <div className="flex flex-col flex-grow mt-4 md:w-90">
            {" "}
            {/* Margin to separate from the image */}
            <p className="text-gray-500 text-xs w-64 font-semibold md:w-90">
              {title.split("\\").pop()}
            </p>
            {/* <div className="flex items-center justify-start p-2 ">
              <button
                onClick={onPlayRemote}
                className="mt-4 bg-black text-white px-4 py-2 rounded 
              hover:bg-blue-600 transition-colors duration-200"
              >
                <img src={Cast} alt="cast" className="w-6 h-6" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card2;
