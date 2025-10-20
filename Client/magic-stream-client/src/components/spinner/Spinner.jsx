import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-text">Loading...</div>
            </div>
        </div>
    );
}

export default Spinner;