import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBookmarkPlus, BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { fetchPopularMovies } from "../../utils/api";

const Popular = () => {
  const [lists, setLists] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    const fetchMovies = async (page) => {
      const data = await fetchPopularMovies(page);
      if (data) {
        setLists(data.results);
        setTotalPages(data.total_pages);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage]);

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
    <div className="md:px-10 p-4">
      <div className="mt-4">
        <h1 className="text-lg md:text-4xl font-bold text-center mb-6">
          Popular Movie List
        </h1>
        <div className="my-6">
          <div className="h-px w-full bg-gray-600" />
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 md:gap-10 gap-6">
          {lists.map((list, i) => (
            <div key={i} className="md:w-56 w-40 mb-auto flex flex-col m-auto">
              <div className="flex flex-col h-full bg-gray-700 border border-rose-900 rounded-lg shadow hover:bg-rose-500 relative">
                <Link to={`/movie/${list.id}`}>
                  <img
                    className="rounded-t-lg w-full h-72 object-cover shadow-[0px_0px_10px_1px_#2d3748]"
                    src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
                    alt={list.title}
                  />
                </Link>
                <div className="absolute top-0 left-0">
                <button
                    type="button"
                    onClick={() => handleAddToWatchlist(list)}
                    disabled={isMovieInWatchlist(list.id)}
                    className={` text-2xl md:text-4xl rounded-tl-lg px-2 md:w-4/5 md:h-14 h-12 flex justify-center items-center ${
                      isMovieInWatchlist(list.id)
                      ? "bg-gray-50 border border-rose-700 z-2 text-rose-600"
                      : "bg-gray-700/75 text-gray-100 hover:bg-gray-700/95"
                    }`}
                  >
                    {isMovieInWatchlist(list.id)? <BsFillBookmarkCheckFill />:<BsBookmarkPlusFill />  }
                  </button>
                </div>
                <div className="flex flex-row gap-2 text-yellow-500 text-xs items-center px-3 py-1 mt-2">
                  <FaStar />
                  <span className="text-gray-50  ">
                    {list.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="px-3 py-1 flex-grow">
                  <a href="#">
                    <h1 className="text-justify text-base font-semibold text-gray-50 truncate">
                      {list.title}
                    </h1>
                  </a>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Popular;
