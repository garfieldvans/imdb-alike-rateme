// src/utils/api.js
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmU4NTBiZDk3OTcwZjY4NWVmYjNhZThmODE1ZDFlNCIsInN1YiI6IjY1NzJkMWU0MjgxMWExMDEzOGE1ZmZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tUKZoh2KP5008Ym-9E1EqOT0s_OMbKDmvo6TyXCtqPs";
const API_URL = "https://api.themoviedb.org/3"
export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/popular`, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await fetch(
      `${API_URL}/movie/now_playing`,
      {
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(
        `${API_URL}/genre/movie/list`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const searchMovies = async (query, page) => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?query=${query}&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: API_KEY,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };
