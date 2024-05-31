import React, { useEffect, useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { fetchMovieDetails, fetchMovieVideos } from "../../utils/api"; // Import fetchMovieVideos function
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetchMovieDetails(id); // Use fetchMovieDetails function
        setMovie(data);

        const videos = await fetchMovieVideos(id); // Fetch movie videos
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideo(
          trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
        );
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
    <div className="bg-gray-950 text-white px-4 md:px-10 py-5 min-h-screen ">
      <h1 className="text-lg md:text-2xl font-bold">{movie.title} - {movie.release_date.split("-")[0]}</h1>
      <div className="my-3">
        <div className="h-px w-full bg-gray-600" />
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col gap-6 mt-4 w-full md:w-10/12">
          <div className="relative flex flex-row gap-2 p-1 rounded-lg bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-gray-700/50 blur-md"></div>
            <div className="relative w-full flex flex-row gap-6 z-10 h-52 md:h-auto">
              <div className="relative w-4/12 hidden md:block">
                <img
                  className="rounded-lg h-full"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <button type="button">
                  <BsBookmarkPlus className="absolute top-0 left-0 rounded-tl-lg text-white font-bold text-4xl bg-gray-700/50 hover:bg-gray-700/75 p-2 w-1/6 h-14" />
                </button>
              </div>
              {video ? (
                <iframe
                  className="rounded-lg w-full h-full"
                  src={video}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  className="rounded-lg w-full h-full"
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="my-3">
            <div className="h-px w-full bg-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold ">Overview</h2>
            <p className="text-justify">{movie.overview}</p>
            <h2 className="text-xl font-bold mt-5">Details</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average.toFixed(1)}</p>
            <p>Runtime: {movie.runtime} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
