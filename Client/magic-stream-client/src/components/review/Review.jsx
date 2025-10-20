import {useRef, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Movie from '../movie/Movie'
import Spinner from '../spinner/Spinner';
import './Review.css';

const Review = () => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const revText = useRef();
    const { imdb_id } = useParams();
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get(`/movie/${imdb_id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [imdb_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosPrivate.patch(`/updatereview/${imdb_id}`, { 
                admin_review: revText.current.value 
            });
            
            setMovie(prevMovie => ({
                ...prevMovie,
                admin_review: response.data?.admin_review ?? prevMovie.admin_review,
                ranking: {
                    ranking_name: response.data?.ranking_name ?? prevMovie.ranking?.ranking_name
                }
            }));

        } catch (err) {
            console.error('Error updating review:', err);
            if (err.response && err.response.status === 401) {
                console.error('Unauthorized access');
            }
        } finally {
            setLoading(false);
        }
    }; 

    return (
        <div className="review-container">
            {loading ? (
                <Spinner />
            ) : (
                <div className="review-content">
                    <h2 className="review-title">Movie Review</h2>
                    <div className="review-layout">
                        <div className="movie-section">
                            <div className="movie-card-wrapper">
                                <Movie movie={movie} />
                            </div>
                        </div>
                        
                        <div className="review-section">
                            {auth && auth.role === "ADMIN" ? (
                                <form onSubmit={handleSubmit} className="review-form">
                                    <div className="form-group">
                                        <label>Admin Review</label>
                                        <textarea
                                            ref={revText}
                                            required
                                            rows={8}
                                            defaultValue={movie?.admin_review}
                                            placeholder="Write your review here..."
                                            className="review-textarea"
                                        />
                                    </div>
                                    <button type="submit" className="submit-btn">
                                        Submit Review
                                    </button>
                                </form>
                            ) : (
                                <div className="review-display">
                                    <h3>Admin Review</h3>
                                    <div className="review-text">
                                        {movie.admin_review || 'No review available for this movie.'}
                                    </div>
                                </div>
                            )}                           
                        </div>
                    </div>
                </div>
            )}
        </div>      
    );
}

export default Review;