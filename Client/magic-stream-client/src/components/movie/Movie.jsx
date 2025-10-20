import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faStar } from '@fortawesome/free-solid-svg-icons';
import "./Movie.css";

const Movie = ({ movie, updateMovieReview }) => {
    return (
        <div className="movie-card" key={movie._id}>
            {movie.ranking?.ranking_name && (
                <div className={`movie-tag ${movie.ranking.ranking_name === 'MAKING HISTORY' ? 'tag-making-history' : 'tag-tax-free'}`}>
                    {movie.ranking.ranking_name}
                </div>
            )}
            
            <div 
                className="movie-poster"
                style={{ backgroundImage: `url(${movie.poster_path})` }}
            >
                <div className="movie-info">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="movie-id">{movie.imdb_id}</p>
                    <div className="movie-rating">
                        <div className="rating-stars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <span className="rating-text">Excellent</span>
                    </div>
                    
                    <div className="movie-buttons">
                        <Link
                            to={`/stream/${movie.youtube_id}`}
                            className="play-btn"
                        >
                            <FontAwesomeIcon icon={faCirclePlay} />
                            Watch Now
                        </Link>
                        
                        {updateMovieReview && (
                            <button
                                className="review-btn"
                                onClick={e => {
                                    e.preventDefault();
                                    updateMovieReview(movie.imdb_id);
                                }}
                            >
                                Review
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;