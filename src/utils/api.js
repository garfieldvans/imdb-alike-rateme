const KEY = "76e850bd97970f685efb3ae8f815d1e4"
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmU4NTBiZDk3OTcwZjY4NWVmYjNhZThmODE1ZDFlNCIsInN1YiI6IjY1NzJkMWU0MjgxMWExMDEzOGE1ZmZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tUKZoh2KP5008Ym-9E1EqOT0s_OMbKDmvo6TyXCtqPs";

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
    const response = await fetch(`${API_URL}/movie/now_playing`, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}/movie/${movieId}`, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const fetchMoviesByGenre = async (genreId, page, releaseDate) => {
  try {
    const response = await fetch(
      `${API_URL}/discover/movie?with_genres=${genreId}&sort_by=release_date.desc&release_date.lte=${releaseDate}&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
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

export const allPopularMovies = async (page) => {
  try {
    const response = await fetch(`${API_URL}/movie/popular?page=${page}`, {
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

export const fetchGenreName = async (genreId) => {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list?language=en`, {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data.genres.find((genre) => genre.id === parseInt(genreId));
  } catch (error) {
    console.error("Error fetching genre name:", error);
  }
};

//untuk wacthlist

export const getRequestToken = async () => {
  try {
    const response = await fetch(`${API_URL}/authentication/token/new`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    });

    const data = await response.json();
    console.log(data);
    return data.request_token;
  } catch (error) {
    console.error("Error fetching request token:", error);
    throw error;
  }
};

export const createSession = async (requestToken) => {
    try {
        const response = await fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request_token: requestToken }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Session ID:', data.session_id);
            return data.session_id;
        } else {
            throw new Error(data.status_message);
        }
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

export const addToWatchlist = async (movieId, sessionId) => {
  try {
    const response = await fetch(
      `${API_URL}/account/20805504/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};
