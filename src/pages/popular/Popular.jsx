import React, { useEffect, useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Popular = () => {
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const auth =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmU4NTBiZDk3OTcwZjY4NWVmYjNhZThmODE1ZDFlNCIsInN1YiI6IjY1NzJkMWU0MjgxMWExMDEzOGE1ZmZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tUKZoh2KP5008Ym-9E1EqOT0s_OMbKDmvo6TyXCtqPs";

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
          className={`mx-1 px-4 py-2 ${currentPage === i ? "bg-rose-500" : "bg-gray-700"} text-white rounded-lg`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    const fetchMovies = async (page) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${page}`,
          {
            headers: {
              accept: "application/json",
              Authorization: auth,
            },
          }
        );
        const data = await response.json();
        setLists(data.results);
        setTotalPages(data.total_pages);
        console.log(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage]);

  return (
    <div className="px-10">
      <div className="mt-4">
        <h1 className="text-lg md:text-4xl font-bold text-center mb-6">
          Popular Movie List
        </h1>
        <div className="my-6">
          <div className="h-px w-full bg-gray-600" />
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-10">
          {lists.map((list, i) => (
            <div key={i} className="w-48 mb-auto flex flex-col">
            <div className="flex flex-col h-full bg-gray-700 border border-rose-900 rounded-lg shadow hover:bg-rose-500 relative">
              <Link to={`/movie/${list.id}`}>
              <img
                  className="rounded-t-lg w-full h-72 object-cover shadow-[0px_0px_10px_1px_#2d3748]"
                  src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
                  alt={list.title}
                />
              </Link>
              <div className="absolute top-0 left-0">
                <button type="button" className="">
                  <BsBookmarkPlus className="text-white text-4xl bg-gray-700/50 hover:bg-gray-700/75 p-2 md:w-4/5 h-14" />
                </button>
              </div>
              <div className="flex flex-row gap-2 text-yellow-500 items-center px-3 py-1">
                <FaStar />
                <span className="text-gray-50">
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
