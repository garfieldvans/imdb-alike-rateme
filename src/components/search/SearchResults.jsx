import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchMovies } from "../../utils/api";
import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [watchlist, setWatchlist] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-4 py-2 ${
            currentPage === i ? "bg-rose-500" : "bg-gray-700"
          } text-white rounded-lg`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      const data = await searchMovies(query, currentPage);
      if (data) {
        setResults(data.results);
        setTotalPages(data.total_pages);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, currentPage]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const handleAddToWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const isMovieInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  return (
    <div className="bg-gray-950 text-white px-4">
      <h1 className="text-lg md:text-2xl font-bold my-4">Search Results</h1>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-4 md:gap-10">
        {results.map((movie, index) =>
          movie.poster_path ? (
            <div key={index} className="md:w-56 w-40 mb-auto flex flex-col m-auto">
              <div className="flex flex-col h-full bg-gray-700 border border-rose-900 rounded-lg shadow hover:bg-rose-500 relative">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className="rounded-t-lg md:w-56 w-auto h-auto shadow-[0px_0px_10px_1px_#2d3748] object-contain"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </Link>
                <div className="absolute top-0 left-0">
                  <button
                    type="button"
                    onClick={() => handleAddToWatchlist(movie)}
                    disabled={isMovieInWatchlist(movie.id)}
                    className={` text-2xl md:text-4xl rounded-tl-lg px-2 md:w-4/5 md:h-14 h-12 flex justify-center items-center ${
                      isMovieInWatchlist(movie.id)
                        ? "bg-gray-50 border border-rose-700 z-2 text-rose-600"
                        : "bg-gray-700/75 text-gray-100 hover:bg-gray-700/95"
                    }`}
                  >
                    {isMovieInWatchlist(movie.id) ? (
                      <BsFillBookmarkCheckFill />
                    ) : (
                      <BsBookmarkPlusFill />
                    )}
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
                <div className="px-3 py-1 flex-grow md:text-sm text-xs">
                  <span>{movie.release_date.split("-")[0]}</span>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="mx-1 px-4 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        {renderPagination()}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="mx-1 px-4 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
