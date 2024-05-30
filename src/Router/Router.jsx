// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/layout';
import Detail from '../components/detail/detail';
import Popular from '../pages/popular/Popular';
import GenrePage from '../pages/byGenre/ByGenre';
import SearchResults from '../components/search/SearchResults';

const AppRouter = () => {

    return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/movie/:id" element={<Detail />} />
              <Route path="/movie/genre/:genreId" element={<GenrePage />} />
              <Route path="/search" element={<SearchResults />} />
            </Route>
          </Routes>
        </Router>
      );
}

export default AppRouter;
