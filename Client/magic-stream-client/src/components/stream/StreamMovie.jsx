import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Spinner from '../spinner/Spinner';
import './StreamMovie.css';

const StreamMovie = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    
    const { yt_id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!yt_id) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosPrivate.get('/movies');
                const allMovies = response.data;
                const foundMovie = allMovies.find(m => m.youtube_id === yt_id);
                
                if (foundMovie) {
                    setMovie(foundMovie);
                } else {
                    setMovie({
                        title: 'Movie Streaming',
                        imdb_id: 'N/A',
                        youtube_id: yt_id
                    });
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
                setMovie({
                    title: 'Movie Streaming',
                    imdb_id: 'N/A',
                    youtube_id: yt_id
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [yt_id, axiosPrivate]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="stream-container">
            <div className="stream-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back
                </button>
                
                <div className="title-section">
                    <h1>Now Streaming</h1>
                    {movie?.title && <p>{movie.title}</p>}
                </div>

                <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="control-btn"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>

            <div className="content-grid">
                <div className="video-column">
                    <div className="video-wrapper">
                        {yt_id ? (
                            <ReactPlayer 
                                playing={isPlaying}
                                controls
                                url={`https://www.youtube.com/watch?v=${yt_id}`}
                                width="100%"
                                height="500px"
                            />
                        ) : (
                            <div className="no-video">
                                Video not available
                            </div>
                        )}
                    </div>

                    {movie && (
                        <div className="movie-info">
                            {movie.ranking?.ranking_name && (
                                <span className={`rank-badge ${movie.ranking.ranking_name.replace(' ', '-').toLowerCase()}`}>
                                    {movie.ranking.ranking_name}
                                </span>
                            )}
                            <p>IMDB: {movie.imdb_id}</p>
                        </div>
                    )}
                </div>

                <div className="sidebar">
                    <div className="info-card">
                        <h3>Streaming Info</h3>
                        <div className="stream-info">
                            <p>Source: YouTube</p>
                            <p>ID: {yt_id}</p>
                        </div>

                        {movie?.admin_review && (
                            <div className="review-section">
                                <h4>Review</h4>
                                <div className="review-text">
                                    {movie.admin_review}
                                </div>
                            </div>
                        )}

                        <div className="actions">
                            <button onClick={() => navigate('/')} className="action-btn home">
                                Browse Movies
                            </button>
                            <button onClick={() => navigate('/recommended')} className="action-btn recommended">
                                Recommended
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamMovie;