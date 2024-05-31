import React, { useEffect, useState } from "react";
import { fetchGenres } from "../../utils/api";
import { Link } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchAllGenres = async () => {
      const data = await fetchGenres();
      if (data) {
        setGenres(data.genres);
      }
    };

    fetchAllGenres();
  }, []);

  return (
    <div className="">
      <h1 className="text-lg md:text-2xl font-bold mt-4">Genres : </h1>
      <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 ">
        {genres.map((list, i) => (
          <div key={i}>
            <Link to={`/movie/genre/${list.id}`}>
              <div className="bg-gray-100 text-gray-950 flex justify-center items-center py-4 rounded-lg font-bold">
                <h1>{list.name}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
