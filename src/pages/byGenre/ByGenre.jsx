import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { fetchMoviesByGenre, fetchGenreName } from "../../utils/api";

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0]; 
      try {
        const moviesData = await fetchMoviesByGenre(genreId, currentPage, today);
        const genreData = await fetchGenreName(genreId);
        
        if (moviesData) {
          // Filter out movies without a poster
          const moviesWithPosters = moviesData.filter(movie => movie.poster_path);
          setMovies(moviesWithPosters);
          setTotalPages(moviesData.total_pages);
        }
        if (genreData) {
          setGenreName(genreData?.name || "Genre");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [genreId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
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

  return (
    <div className="p-4 sm:p-6 bg-gray-950 text-white">
      <h1 className="text-2xl font-bold mb-6">{genreName} Movies</h1>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-10">
        {movies.map((list, i) => (
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
          className="mx-1 px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="mx-1 px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenrePage;
