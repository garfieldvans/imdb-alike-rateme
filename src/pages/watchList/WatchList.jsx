// Watchlist.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa";

const Watchlist = () => {
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmU4NTBiZDk3OTcwZjY4NWVmYjNhZThmODE1ZDFlNCIsInN1YiI6IjY1NzJkMWU0MjgxMWExMDEzOGE1ZmZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tUKZoh2KP5008Ym-9E1EqOT0s_OMbKDmvo6TyXCtqPs";

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/account/20805504/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: API_KEY,
            },
          }
        );
        const data = await response.json();
        setWatchlist(data.results);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="bg-gray-950 text-white px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold mt-2">My Watchlist</h1>
        <Link to="/" className="flex flex-row gap-2 items-center hover:underline">
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="my-3">
        <div className="h-px w-full bg-gray-600" />
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-10">
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
              <div className="flex flex-row gap-2 text-yellow-500 items-center px-3 py-1">
                <FaStar />
                <span className="text-gray-50">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="px-3 py-1 flex-grow">
                <Link to={`/movie/${movie.id}`}>
                  <h1 className="text-justify text-base font-semibold text-gray-50 truncate">{movie.title}</h1>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
