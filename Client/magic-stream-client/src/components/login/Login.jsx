import { useState } from 'react';
import axiosClient from '../../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/MagicStreamLogo.png';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axiosClient.post('/login', { email, password });
            
            if (response.data.error) {
                setError(response.data.error);
                return;
            }

            const userData = response.data;
            setAuth(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            navigate('/', { replace: true });
            
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={logo} alt="Magic Stream Logo" className="login-logo" />
                    <h2>Welcome Back</h2>
                    <p>Sign in to your Magic Stream account</p>
                    {error && <div className="error-message">{error}</div>}                
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Signing In...
                            </>
                        ) : 'Sign In'}
                    </button>
                    
                    <div className="register-link">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </div>
                </form>
            </div>           
        </div>
    );
};

export default Login;