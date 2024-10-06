import React, { useState, useEffect } from 'react';
import './stylesheet/Search.css';
import axios from 'axios';
import logo1 from './images/logo.png';
import LatestMovies from './LatestMovies';
import search from './images/search.svg';

function Search() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenreName, setSelectedGenreName] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:5000/genres');
                setGenres(response.data);
            } catch (err) {
                console.error('Error fetching genres:', err);
                
            }
        };
        fetchGenres();
    }, [movies]);

    const handleSearch = async () => {
        if (!selectedGenre) {
            setMovies([])
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/movies/${selectedGenre}`);
            setMovies(response.data);
            console.log(`movies: ${movies}`)
        } catch (err) {
            console.error('Error fetching movies:', err);
            alert('Error fetching movies. Please try again.');
        }
    };

    const handleGenreChange = (e) => {
        const selectedGenreId = e.target.value;
        setSelectedGenre(selectedGenreId);

        const genre = genres.find(genre => genre.id === parseInt(selectedGenreId));
        setSelectedGenreName(genre ? genre.name : '');
    };

    const handleSearchByName = async () => {
        if (!searchTerm) {
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/search`, {
                params: { name: searchTerm }
            });
            setMovies(response.data);
        } catch (err) {
            console.error('Error fetching movies:', err);
            alert('Error fetching movies. Please try again.');
        }
    };

    const latestMoviesStyle = {
        position: selectedGenre ? 'relative' : 'absolute',
        top: selectedGenre === '' ? '15vh' : '320vh',
        left: selectedGenre === '' ? '6%' : '-2%',
    };

    return (
        <>
            <div className='homepage'>
                <div className='heading-navbar'>
                <div className='navbar'>
                    <img className='logo' src={logo1} alt='logos' />
                    <select
                        onClick={handleSearch}
                        className='selectbutton'
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <div class="search-container">
                        
                            <input
                                type="text"
                                className='search-input'
                                placeholder="Search by movie name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className='searchbutton' onClick={handleSearchByName}>
                                <img className='search-img' src={search} alt='logos' />
                            </button>
                       
                    </div>
                </div>
                </div>
                <div className='moviess'>
                    {selectedGenreName && (
                        <div className='s-genre'>
                            <h2>Selected Genre: {selectedGenreName}</h2>
                        </div>
                    )}
                    <div className='s-movie-card'>
                        
                        {movies.map((movie) => (
                            <div key={movie.id} className="s-card">
                                <img
                                    className='s-image-card'
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h3>{movie.imdb_rating}</h3>
                                <a href={`/movie/${movie.id}`}>{movie.title}</a>
                                <div>
                                    {console.log(`movie: ${JSON.stringify(movie)}`)}
                                    <p>IMDB Rating: {movie.vote_average}</p>
                                    <p>Release Date: {movie.release_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="s-latest" style={latestMoviesStyle}>
                <LatestMovies />
            </div>
        </>
    );
}

export default Search;
