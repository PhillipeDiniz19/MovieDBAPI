import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './movie.css'
import { FaStar } from "react-icons/fa";

const apiKey = 'f050ec0b7855de2a4c5e0d9aeaec97a4';

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                const data = await res.json();
                setMovie(data);
                console.log(data)
            };
            getMovie();          
    }, []);

    return (
        <div>
            {movie && (
                <div className="container-id">
                    <div className="post-id">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <div className="content-id">
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <p><FaStar color='black' />{movie.vote_average}</p>
                        </div>
                    </div>   
                </div>
            )}
        </div>
    );
};

export default Movie;
