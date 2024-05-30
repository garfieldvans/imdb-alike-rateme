import React, { useEffect, useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const auth =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmU4NTBiZDk3OTcwZjY4NWVmYjNhZThmODE1ZDFlNCIsInN1YiI6IjY1NzJkMWU0MjgxMWExMDEzOGE1ZmZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tUKZoh2KP5008Ym-9E1EqOT0s_OMbKDmvo6TyXCtqPs";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: auth,
            },
          }
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-950 text-white px-10 py-5 min-h-screen">
      <h1 className="text-lg md:text-2xl font-bold">{movie.title}</h1>
      <div className="my-3">
        <div className="h-px w-full bg-gray-600" />
      </div>
      <div className="flex flex-col gap-10">
        <div
          className="relative flex flex-row gap-2 p-4 rounded-lg bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gray-200 opacity-70 blur-md"></div>
          <div className="relative w-full flex flex-row gap-2 z-10">
            <div className="relative w-4/12">
              <img
                className="rounded-lg shadow-[0px_0px_10px_1px_#2d3748] h-full"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <button type="button">
                <BsBookmarkPlus className="absolute top-0 left-0 rounded-tl-lg text-white font-bold text-4xl bg-gray-700/50 hover:bg-gray-700/75 p-2 w-1/6 h-14" />
              </button>
            </div>
            <img
              className="rounded-lg w-full shadow-[0px_0px_10px_1px_#2d3748] h-full"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Overview</h2>
          <p>{movie.overview}</p>
          <h2 className="text-xl font-bold mt-5">Details</h2>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
          <p>Runtime: {movie.runtime} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
