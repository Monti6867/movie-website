// src/components/LatestMovies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylesheet/LatestMovies.css';

function LatestMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchLatestMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/latest-movies');
                setMovies(response.data);
            } catch (err) {
                console.error('Error fetching latest movies:', err);
                alert('Error fetching latest movies. Please try again.');
            }
        };
        fetchLatestMovies();
    }, []);

    return (
        <div className='movies'>
            <span className='LatestMovieHeading'>
            <h1 >Latest Movies</h1>
            </span>
            <div className='movie-card'>
                {movies.map(movie => (
                    <div key={movie.id}>
                        <img className= 'image-card' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <a href={`/movie/${movie.id}`}>{movie.title}</a>
                        <div>
                                    <p>IMDB Rating: {movie.vote_average}</p>
                                    <p>Release Date: {movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LatestMovies;
