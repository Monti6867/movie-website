// import express from 'express';
// import cors from 'cors';
// import pg from 'pg';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = 5000;
// const API_KEY = process.env.TMDB_API_KEY;

// const db = new pg.Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'moviesdb',
//     password: 'shizuka6867',
//     port: '5432',
// });

// app.use(cors());
// app.use(express.json());
// db.connect();

// // API endpoint to search movies by genre from TMDb
// app.get('/movies/:genre', async (req, res) => {
//     const { genre } = req.params;
//     try {
//         console.log(`Fetching movies for genre: ${genre}`);
//         const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`);
//         res.json(response.data.results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // API endpoint to get movie details by ID from TMDb
// app.get('/movie/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
//         const movie = response.data;
//         const movieDetails = {
//             title: movie.title,
//             image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//             release_date: movie.release_date,
//             budget: movie.budget,
//             imdb_rating: movie.vote_average,
//             original_language: movie.original_language,
//             overview: movie.overview,
//             revenue: movie.revenue,
//             runtime: movie.runtime,
//             genres: movie.genres.name,
//         };
//         res.json(movieDetails);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// app.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });


import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;
const API_KEY = process.env.TMDB_API_KEY;

app.use(cors());
app.use(express.json());



//Fetch latest movies from TMDb API
app.get('/latest-movies', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        console.log(response);
        res.json(response.data.results.slice(0, 20)); // Get the first 20 movies
    } catch (err) {
        console.error('Error fetching latest movies:', err);
        res.status(500).send('Server error');
    }
});

// // Fetch genres from TMDb API
app.get('/genres', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        console.log(response);
        res.json(response.data.genres);
    } catch (err) {
        console.error('Error fetching genres:', err);
        res.status(500).send('Server error');
    }
});

// Fetch movies by genre from TMDb API
app.get('/movies/:genreId', async (req, res) => {
    const { genreId } = req.params;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        console.log(response);
        res.json(response.data.results);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).send('Server error');
    }
});

// New API endpoint to search movies by name
app.get('/search', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`);
        console.log(response);
        res.json(response.data.results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Fetch movie details by ID from TMDb API
app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        console.log(response);
        const movie = response.data;
        console.log(response.data);
        const movieDetails = {
            title: movie.title,
            tagline: movie.tagline,
            backGroundImg: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            release_date: movie.release_date,
            budget: movie.budget,
            imdb_rating: movie.vote_average,
            original_language: movie.original_language,
            overview: movie.overview,
            status : movie.status,
            Genres : movie.genres.map((genres) => {return genres.name}),
            revenue: movie.revenue,
            runtime: movie.runtime,
        };
        res.json(movieDetails);
    } catch (err) {
        console.error('Error fetching movie details:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
