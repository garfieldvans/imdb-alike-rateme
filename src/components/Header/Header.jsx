import React, { useState, useEffect } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { fetchGenres } from "../../utils/api";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllGenres = async () => {
      const data = await fetchGenres();
      if (data) {
        setGenres(data.genres);
      }
    };

    fetchAllGenres();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-gray-950 border-gray-200 px-4 sm:px-6 lg:px-16 py-2.5 shadow-[0px_3px_15px_0px_#9b2c2c]">
        <div className="grid grid-flow-col md:grid-cols-12 gap-4 md:gap-10 w-full justify-between items-center">
          <Link
            to="/"
            className="flex col-span-1 items-center justify-center focus:outline-none"
          >
            <span className="bg-white hover:bg-rose-500 p-2 rounded-lg self-center text-xl text-gray-950 hover:text-white font-bold whitespace-nowrap shadow-[2px_2px_5px_0px_#e53e3e]">
              RaMe
            </span>
          </Link>
          <div className="col-span-7 flex flex-row">
            <form
              className="w-full bg-white rounded-lg"
              onSubmit={handleSearchSubmit}
            >
              <div className="flex w-full">
                <button
                  id="dropdown-button"
                  className="focus:outline-none flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <span>Genre</span>
                  <IoIosArrowDown
                    style={{ marginLeft: "4px", marginRight: "4px" }}
                  />
                </button>
                {dropdownVisible && (
                  <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-10/12 md:w-4/12 absolute left-10 mt-12"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 grid grid-cols-2 gap-2"
                      aria-labelledby="dropdown-button"
                    >
                      {genres.map((genre) => (
                        <li key={genre.id}>
                          <Link
                            to={`/movie/genre/${genre.id}`}
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => setDropdownVisible(false)}
                          >
                            {genre.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 outline-0"
                    placeholder="Search Movie, Tv Series, Actors.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="p-2.5 text-sm font-medium h-full text-white bg-rose-500 rounded-e-lg border border-rose-500 hover:border-rose-700 hover:bg-rose-700 focus:outline-none"
                  >
                    <FiSearch />
                  </button>
                </div>
              </div>
            </form>
            <div className="ml-0 md:ml-10 md:block hidden">
              <div className="w-px h-10 bg-gray-700" />
            </div>
          </div>

          <div className="col-span-4 flex flex-row items-center text-white text-xs md:text-base font-semibold justify-between px-4 relative">
            <Link
              to="/watchlist"
              className="hidden sm:flex flex-row gap-2 items-center py-2 px-3 justify-center hover:bg-rose-500 hover:rounded-lg"
            >
              <BsBookmarkPlusFill size={20} />
              <span>Wishlist</span>
            </Link>
            <button
              className="flex flex-row justify-center items-center gap-2 hover:bg-rose-500 py-2 px-3 hover:rounded-lg"
              onClick={toggleMenu}
            >
              <GiHamburgerMenu size={22} />
              <span className="md:block hidden">Menu</span>
            </button>
            {menuVisible && (
              <div className="absolute top-full right-0 mt-3 w-full bg-white rounded-lg shadow-lg z-20 bg-slate-200">
                <ul className="py-2 text-gray-700">
                  <li>
                    <Link
                      to="/about"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuVisible(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuVisible(false)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuVisible(false)}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
