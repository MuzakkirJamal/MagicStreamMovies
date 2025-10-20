import { useState, useEffect} from 'react';
import axiosClient from '../../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/MagicStreamLogo.png';
import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [favouriteGenres, setFavouriteGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenreChange = (e) => {
        const options = Array.from(e.target.selectedOptions);
        setFavouriteGenres(options.map(opt => ({
            genre_id: Number(opt.value),
            genre_name: opt.label
        })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const defaultRole ="USER";

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                role: defaultRole,
                favourite_genres: favouriteGenres
            };
            const response = await axiosClient.post('/register', payload);
            if (response.data.error) {
                setError(response.data.error);
                return;
            }
            navigate('/login', { replace: true });
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchGenres = async () => {
        try {
            const response = await axiosClient.get('/genres');
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching movie genres:', error);
        }
        };
    
        fetchGenres();
    }, []);

    return (
       <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <img src={logo} alt="Magic Stream Logo" className="register-logo" />
                    <h2>Join Magic Stream</h2>
                    <p>Create your account and start streaming</p>
                    {error && <div className="error-message">{error}</div>}                
                </div>
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                className={confirmPassword && password !== confirmPassword ? 'error' : ''}
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <span className="field-error">Passwords do not match</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Favorite Genres</label>
                        <select
                            multiple
                            value={favouriteGenres.map(g => String(g.genre_id))}
                            onChange={handleGenreChange}
                            className="genre-select"
                        >
                            {genres.map(genre => (
                                <option key={genre.genre_id} value={genre.genre_id}>
                                    {genre.genre_name}
                                </option>
                            ))}
                        </select>
                        <small>Hold Ctrl (Windows) or Cmd (Mac) to select multiple genres</small>
                    </div>
                    
                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Registering...
                            </>
                        ) : 'Create Account'}
                    </button>
                    
                    <div className="login-link">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>           
       </div>
    )
}

export default Register;