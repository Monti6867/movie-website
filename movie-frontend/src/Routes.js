import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';

function Routers() {
    return(
        <Router>
            <Routes>
                
                <Route path="/" element={<Search />} /> 
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </Router>
    );
}
export default Routers;