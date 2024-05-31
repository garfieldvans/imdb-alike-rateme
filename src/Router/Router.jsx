// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/layout';
import Detail from '../components/detail/detail';
import Popular from '../pages/popular/Popular';
import GenrePage from '../pages/byGenre/ByGenre';
import SearchResults from '../components/search/SearchResults';
import Watchlist from '../pages/watchList/WatchList';
import Genres from '../pages/genres/Genres';
import NowPlaying from '../pages/nowPlaying/nowPlaying';

const AppRouter = () => {

    return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/on-cinema" element={<NowPlaying />} />
              <Route path="/movie/:id" element={<Detail />} />
              <Route path="/movie/genre/:genreId" element={<GenrePage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/genres" element={<Genres />} />
            </Route>
          </Routes>
        </Router>
      );
}

export default AppRouter;
