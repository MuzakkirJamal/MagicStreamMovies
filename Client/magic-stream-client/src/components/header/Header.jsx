import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/MagicStreamLogo.png';
import './Header.css';

const Header = ({ handleLogout }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-section">
                    <img src={logo} alt="Magic Stream" className="logo" />
                    {/* Removed duplicate text */}
                </Link>

                <nav className="nav-menu">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    
                    {auth && (
                        <Link 
                            to="/recommended" 
                            className={`nav-link ${location.pathname === '/recommended' ? 'active' : ''}`}
                        >
                            Recommended
                        </Link>
                    )}
                </nav>

                <div className="auth-section">
                    {auth ? (
                        <div className="user-menu">
                            <span className="welcome-text">
                                Welcome, {auth.first_name}!
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="login-btn">
                                Login
                            </Link>
                            <Link to="/register" className="register-btn">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;