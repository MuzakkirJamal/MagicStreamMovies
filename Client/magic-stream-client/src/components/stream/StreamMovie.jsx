import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Spinner from '../spinner/Spinner';

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
        <div style={{
            background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
            minHeight: '100vh',
            color: 'white',
            padding: '20px',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                maxWidth: '1400px',
                margin: '0 auto 30px auto',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}
                >
                    ← Back to Movies
                </button>
                
                <div style={{
                    position: 'relative',
                    textAlign: 'center',
                    flexGrow: 1,
                    paddingTop: '50px'
                }}>
                    {movie?.ranking?.ranking_name && (
                        <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(45deg, #ff8a00, #e52e71)',
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '15px',
                            fontSize: '0.9rem',
                            fontWeight: '700'
                        }}>
                            {movie.ranking.ranking_name}
                        </div>
                    )}
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: '0 0 5px 0'
                    }}>
                        Now Streaming
                    </h1>
                    {movie && (
                        <p style={{
                            color: '#b8b8b8',
                            fontSize: '1.3rem',
                            margin: '0'
                        }}>
                            {movie.title}
                        </p>
                    )}
                </div>
                
                <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    style={{
                        background: 'linear-gradient(45deg, #ff8a00, #e52e71)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}
                >
                    {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '40px',
                maxWidth: '1400px',
                margin: '0 auto',
                alignItems: 'start'
            }}>
                <div>
                    <div style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        background: '#000',
                        marginBottom: '20px'
                    }}>
                        {yt_id ? (
                            <ReactPlayer 
                                playing={isPlaying}
                                controls
                                url={`https://www.youtube.com/watch?v=${yt_id}`}
                                width="100%"
                                height="500px"
                            />
                        ) : (
                            <div style={{
                                height: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#1a1a1a',
                                color: '#b8b8b8'
                            }}>
                                No video available
                            </div>
                        )}
                    </div>

                    {movie && (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '15px',
                            padding: '25px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <p style={{
                                color: '#b8b8b8',
                                fontFamily: 'monospace',
                                margin: '0'
                            }}>
                                IMDB: {movie.imdb_id}
                            </p>
                        </div>
                    )}
                </div>

                {movie && (
                    <div style={{ position: 'sticky', top: '20px' }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '15px',
                            padding: '30px',
                            color: '#333'
                        }}>
                            <h3 style={{ 
                                color: '#302b63', 
                                marginTop: '0', 
                                marginBottom: '20px' 
                            }}>
                                Streaming Controls
                            </h3>
                            
                            <div style={{ marginBottom: '25px' }}>
                                <p style={{ color: '#666', margin: '0 0 8px 0' }}>
                                    Video is playing from YouTube
                                </p>
                                <p style={{ color: '#666', margin: '0' }}>
                                    ID: <code>{yt_id}</code>
                                </p>
                            </div>

                            {movie.admin_review && (
                                <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ 
                                        color: '#302b63', 
                                        marginBottom: '15px' 
                                    }}>
                                        🎬 Review
                                    </h4>
                                    <div style={{
                                        background: '#f8f9fa',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        borderLeft: '4px solid #0072ff',
                                        color: '#555'
                                    }}>
                                        {movie.admin_review}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <button 
                                    onClick={() => navigate('/')}
                                    style={{
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px 20px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    🏠 Browse Movies
                                </button>
                                <button 
                                    onClick={() => navigate('/recommended')}
                                    style={{
                                        background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px 20px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
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