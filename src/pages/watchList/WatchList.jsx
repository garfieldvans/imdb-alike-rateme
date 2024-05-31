import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBookmarkPlus, BsBookmarkXFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Load watchlist from localStorage when component mounts
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const isMovieInWatchlist = (movieId) => {
    // Check if movie is in watchlist
    return watchlist.some((movie) => movie.id === movieId);
  };

  return (
    <div className="w-full text-white px-4 mt-2">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <div className="flex items-center w-full justify-center">
          <h1 className="text-lg font-bold">No wishlist yet. Go get some.....</h1>{" "}
        </div>
      ) : null}
      <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-10 w-full">
        {watchlist.map((movie, i) => (
          <div key={i} className="w-48 mb-auto flex flex-col">
            <div className="flex flex-col h-full bg-gray-700 border border-rose-900 rounded-lg shadow hover:bg-rose-500 relative">
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="rounded-t-lg w-auto h-auto shadow-[0px_0px_10px_1px_#2d3748] object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </Link>

              <div className="absolute top-0 left-0">
                <button
                  type="button"
                  onClick={() => removeFromWatchlist(movie.id)}
                  className={` text-3xl md:text-4xl rounded-tl-lg px-1 md:w-4/5  h-12 flex justify-center items-center ${
                    isMovieInWatchlist(movie.id)
                      ? "bg-rose-600 z-2 text-gray-100"
                      : "bg-gray-700/75 text-gray-100 hover:bg-gray-700/95"
                  }`}
                >
                  <BsBookmarkXFill />
                </button>
              </div>
              <div className="flex flex-row gap-2 text-yellow-500 text-xs items-center px-3 py-1 mt-2">
                  <FaStar />
                  <span className="text-gray-50  ">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              <div className="px-3 py-1 flex-grow">
                <Link to={`/movie/${movie.id}`}>
                  <h1 className="text-justify text-base font-semibold text-gray-50 truncate">
                    {movie.title}
                  </h1>
                </Link>
              </div>
              <div className="px-3 py-1 flex-grow md:text-sm text-xs m-auto">
                  <span>{movie.release_date.split("-")[0]}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
