import React, { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsBookmarkPlusFill, BsFillBookmarkStarFill } from "react-icons/bs";
import { fetchPopularMovies, fetchNowPlayingMovies } from "../../utils/api";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchPopularMovies();
      if (data) {
        const filteredData = data.results.filter((movie) => movie.poster_path);
        setLists(filteredData);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const data = await fetchNowPlayingMovies();
      if (data) {
        const filteredData = data.results.filter((movie) => movie.poster_path);
        setNowPlayingMovies(filteredData);
      }
    };

    fetchNowPlaying();
  }, []);

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
      <div>
        <h1 className="text-lg md:text-2xl font-bold">Now Playing</h1>
        <div className="md:px-16 px-2 mt-4">
          <Slider {...settings} className="">
            {nowPlayingMovies.map((movie, index) => (
              <div key={index} className="mt-2 md:px-6 px-0">
                <div className="relative w-full flex flex-row gap-3 z-10 justify-center">
                  <div className="relative flex justify-center md:w-3/12 w-9/12 h-4/5 md:h-auto">
                    <Link to={`/movie/${movie.id}`}>
                      <h1 className="absolute md:hidden bottom-0 w-full flex justify-center min-h-24 items-center backdrop-blur-md text-white md:text-2xl text-lg bg-black bg-opacity-50 px-2 py-1 hover:underline text-center">
                        {movie.title}
                      </h1>
                    </Link>
                    <div className="md:hidden flex">
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          className="rounded-lg shadow-[0px_0px_10px_1px_#2d3748] h-full hover:opacity-85"
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToWatchlist(movie)}
                      disabled={isMovieInWatchlist(movie.id)}
                      className={` absolute top-0 left-0 text-white text-4xl rounded-tl-lg px-1 md:w-1/6 h-14 flex justify-center items-center ${
                        isMovieInWatchlist(movie.id)
                          ? "bg-gray-50 border border-rose-700 z-2 text-rose-600"
                          : "bg-gray-700/75 text-gray-100 hover:bg-gray-700/95"
                      }`}
                    >
                      {isMovieInWatchlist(movie.id) ? (
                        <BsFillBookmarkStarFill />
                      ) : (
                        <BsBookmarkPlusFill />
                      )}
                    </button>
                    <div className="hidden md:flex">
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          className="rounded-lg shadow-[0px_0px_10px_1px_#2d3748] h-full hover:opacity-85"
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="w-9/12 relative md:block hidden rounded-lg">
                    <Link to={`/movie/${movie.id}`}>
                      <h1 className="absolute bottom-0 w-full  flex justify-center min-h-24 items-center backdrop-blur-md text-white text-2xl bg-gray-700 rounded-b-lg bg-opacity-50 px-2 py-1 hover:underline ">
                        {movie.title}
                      </h1>
                    </Link>
                    <img
                      className="rounded-lg w-full shadow-[0px_0px_10px_1px_#2d3748] h-full"
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex flex-row justify-between items-center pe-5">
          <h1 className="text-lg md:text-2xl font-bold mt-2">
            Popular Movie List
          </h1>
          <div className=" hover:underline">
            <Link to="/popular" className="flex flex-row gap-2 items-center">
              <span>See All</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="my-3">
          <div className="h-px w-full bg-gray-600" />
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-10">
          {lists.map((movie, i) => (
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
                    onClick={() => handleAddToWatchlist(movie)}
                    disabled={isMovieInWatchlist(movie.id)}
                    className={` text-3xl md:text-4xl rounded-tl-lg px-1 md:w-4/5  h-12 flex justify-center items-center ${
                      isMovieInWatchlist(movie.id)
                        ? "bg-gray-50 border border-rose-700 z-2 text-rose-600"
                        : "bg-gray-700/75 text-gray-100 hover:bg-gray-700/95"
                    }`}
                  >
                    {isMovieInWatchlist(movie.id) ? (
                      <BsFillBookmarkStarFill />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
