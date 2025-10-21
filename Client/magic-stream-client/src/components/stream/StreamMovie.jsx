import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Spinner from '../spinner/Spinner';
import './StreamMovie.css';

const StreamMovie = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    
    let params = useParams();
    let key = params.yt_id;
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!key) {
                setError('No video ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axiosPrivate.get(`/movies`);
                const allMovies = response.data;
                
                const foundMovie = allMovies.find(m => m.youtube_id === key);
                if (foundMovie) {
                    setMovie(foundMovie);
                } else {
                    setMovie({
                        title: 'Movie Streaming',
                        imdb_id: 'N/A',
                        youtube_id: key
                    });
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setMovie({
                    title: 'Movie Streaming',
                    imdb_id: 'N/A',
                    youtube_id: key
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [key]);

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="stream-container">
            <div className="stream-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back to Movies
                </button>
                <div className="stream-title-section">
                    <h1 className="stream-title">Now Streaming</h1>
                    {movie && (
                        <p className="movie-streaming-title">{movie.title}</p>
                    )}
                </div>
                <button 
                    onClick={togglePlayback} 
                    className="playback-control"
                >
                    {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
            </div>

            <div className="stream-content">
                <div className="video-section">
                    <div className="video-player-container">
                        {(key != null) ? (
                            <ReactPlayer 
                                controls={true} 
                                playing={isPlaying}
                                url={`https://www.youtube.com/watch?v=${key}`}
                                width='100%'
                                height='100%'
                                className="react-player"
                                config={{
                                    youtube: {
                                        playerVars: { 
                                            showinfo: 1,
                                            rel: 0,
                                            modestbranding: 1
                                        }
                                    }
                                }}
                                onError={(e) => console.error('Video player error:', e)}
                            />
                        ) : (
                            <div className="no-video-placeholder">
                                <p>No video available</p>
                            </div>
                        )}
                    </div>

                    {movie && (
                        <div className="video-info-card">
                            {/* Ranking first, then IMDB below it */}
                            {movie.ranking?.ranking_name && (
                                <div className={`movie-tag ${movie.ranking.ranking_name === 'MAKING HISTORY' ? 'tag-making-history' : 'tag-tax-free'}`}>
                                    {movie.ranking.ranking_name}
                                </div>
                            )}
                            
                            {/* IMDB ID moved below the ranking */}
                            <p className="movie-imdb">IMDB: {movie.imdb_id}</p>
                        </div>
                    )}
                </div>
                
                {movie && (
                    <div className="movie-details-section">
                        <div className="details-card">
                            <h3>Streaming Controls</h3>
                            
                            <div className="playback-info">
                                <p>Video is playing from YouTube</p>
                                <p>ID: <code>{key}</code></p>
                            </div>

                            {movie.admin_review && (
                                <div className="admin-review-section">
                                    <h4>🎬 Review</h4>
                                    <div className="review-content">
                                        {movie.admin_review}
                                    </div>
                                </div>
                            )}

                            <div className="stream-actions">
                                <button onClick={() => navigate('/')} className="stream-action-btn home">
                                    🏠 Browse Movies
                                </button>
                                <button onClick={() => navigate('/recommended')} className="stream-action-btn recommended">
                                    💫 Recommended
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StreamMovie;