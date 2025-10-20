import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {useEffect, useState} from 'react';
import Movies from '../movies/Movies';
import Spinner from '../spinner/Spinner';
import './Recommended.css';

const Recommended = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            setLoading(true);
            setMessage("");

            try{
                const response = await axiosPrivate.get('/recommendedmovies');
                setMovies(response.data);
                if (response.data.length === 0){
                    setMessage('No recommended movies available based on your preferences')
                }
            } catch (error){
                console.error("Error fetching recommended movies:", error)
                setMessage("Error loading recommended movies")
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendedMovies();
    }, [])

    return (
        <div className="recommended-container">
            {loading ? (
                <Spinner/>
            ) :(
                <>
                    <div className="recommended-header">
                        <h1 className="recommended-title">Recommended For You</h1>
                        <p className="recommended-subtitle">Movies tailored to your taste</p>
                    </div>
                    <Movies movies={movies} message={message} />
                </>
            )}
        </div>
    )
}

export default Recommended;