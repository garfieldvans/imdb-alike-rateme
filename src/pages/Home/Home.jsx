// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsBookmarkPlus } from "react-icons/bs";
import {  fetchNowPlayingMovies } from "../../utils/api";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

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
    const fetchNowPlaying = async () => {
      const data = await fetchNowPlayingMovies();
      if (data) {
        const filteredData = data.results.filter(movie => movie.poster_path);
        setNowPlayingMovies(filteredData);
      }
    };

    fetchNowPlaying();
  }, []);

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
                    <img
                      className="rounded-lg shadow-[0px_0px_10px_1px_#2d3748] "
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="hidden md:flex">
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          className="rounded-lg shadow-[0px_0px_10px_1px_#2d3748] h-full hover:opacity-85"
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                    </div>

                    <button type="button">
                      <BsBookmarkPlus className="absolute top-0 left-0 rounded-tl-lg text-white font-bold text-4xl bg-gray-700/50 hover:bg-gray-700/75 p-2 w-1/6 h-14" />
                    </button>
                  </div>
                  <div className="w-9/12 relative md:block hidden">
                    <Link to={`/movie/${movie.id}`}>
                      <h1 className="absolute bottom-0 w-full  flex justify-center min-h-24 items-center backdrop-blur-md text-white text-2xl bg-black bg-opacity-50 px-2 py-1 hover:underline ">
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
      
    </div>
  );
};

export default Home;
