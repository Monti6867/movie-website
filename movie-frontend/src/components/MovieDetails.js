import React, { useState, useEffect } from 'react';
import './stylesheet/MovieDetails.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircleRating from './circlerating/CircleRating';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/movie/${id}`);
                setMovie(response.data);

                // Set the background image after the movie data is fetched
                // const link = `https://image.tmdb.org/t/p/w500${response.data.backGroundImg}`;
                // document.body.style.backgroundImage = `url(${link})`;
                const link = `https://image.tmdb.org/t/p/w500${response.data.backGroundImg}`;
                document.getElementById('background-container').style.backgroundImage = `url(${link})`;
            } catch (err) {
                console.error('Error fetching movie details:', err);
                // alert('Error fetching movie details. Please try again.');
            }
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div id="page-container">
            <div id="background-container"></div>
        <div className='mainpage'>
            {/* <img className= "bgimg" src={movie.backGroundImg} alt={movie.title} /> */}
            <div className='movie-content'>
                {/* Image is right side */}
                <div className='content-left'>
                    <img className='fimg' src={movie.image} alt={movie.title} />
                </div>
             {/* content is Left side */}
             <div className='content-right'>
                {console.log(movie)}
            
            <div className='title'>{movie.title}</div>
            <div className='tagline'>{movie.tagline}</div>
            <div className = 'genres'>{movie.Genres.join(" , ")}</div>
              <div className='progressBar'>
              <CircleRating rating={movie.imdb_rating} /> 
              </div>
            <div className='overview'>overview </div>
            <div className='m-overview'>{movie.overview}</div>

            <div className='f-row'>
            <div>Status: <span>{movie.status}</span></div>
            <div>Release Date: <span>{movie.release_date}</span></div>
            <div>Runtime: <span>{movie.runtime}min.</span></div>   
            </div>
            <div className='f-row'>
            <div>Original Language: <span>{movie.original_language}</span></div>
            <div>Revenue: <span>{movie.revenue}</span></div>
            </div>
            <div className='f-row'>
            <div>Budget: <span>{movie.budget}$</span></div>
            </div>
            <div className='main-button'>
            <button className= "t-button"onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, '_blank')}>Watch Trailer</button>
            </div>
             </div>
            </div>
        </div>
        </div>
    );
}

export default MovieDetails;
