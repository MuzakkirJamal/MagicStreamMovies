import Movie from '../movie/Movie'
import './Movies.css';

const Movies = ({ movies, updateMovieReview, message }) => {
    return (
        <div className="movies-container">
            <header className="movies-header">
                {/* REMOVED THE H1 THAT WAS SHOWING "MOVIE" TEXT */}
                <p className="tagline">YOUR ULTIMATE MOVIE DESTINATION</p>
            </header>

            <div className="movie-grid">
                {movies && movies.length > 0
                    ? movies.map((movie) => (
                        <Movie key={movie._id} updateMovieReview={updateMovieReview} movie={movie} />
                    ))
                    : <h2 className="no-movies-message">{message}</h2>
                }
            </div>
        </div>
    );
};

export default Movies;