import React, { useState, useEffect, useRef } from 'react';
import './Catalog.css';
import UpdateNotifier from '../../components/UpdateNotifier/UpdateNotifier';

const Catalog = () => {
    const [tours, setTours] = useState([]);
    const [visibleTour, setVisibleTour] = useState(null);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const closeTimerRef = useRef(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/resorts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTours(data);
            setLastUpdate(Date.now()); // Update the last update time
            setVisibleTour(null); // Reset the visibleTour state to hide additional info
            clearTimeout(closeTimerRef.current); // Clear any existing timer
            setError(null); // Clear previous errors
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const toggleMoreInfo = (id) => {
        if (visibleTour === id) {
            setVisibleTour(null);
            clearTimeout(closeTimerRef.current);
        } else {
            setVisibleTour(id);
            clearTimeout(closeTimerRef.current); // Clear any existing timer
            closeTimerRef.current = setTimeout(() => {
                setVisibleTour(null);
            }, 10000); // Close after 10 seconds
        }
    };

    return (
        <div className="catalog-container">
            <UpdateNotifier lastUpdate={lastUpdate} />
            <div className="intro">
                <p>Welcome to our tour catalog! Select a tour to learn more.</p>
            </div>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="blocktours">
                    {tours.map(tour => (
                        <div className="tour" key={tour.id}>
                            <img src={tour.img} alt={tour.name} />
                            <div className="name" onClick={() => toggleMoreInfo(tour.id)}>
                                <h3>{tour.name}</h3>
                                {tour.price}
                                <div className="show-more">{visibleTour === tour.id ? '-' : '+'}</div>
                            </div>
                            {visibleTour === tour.id && (
                                <div className="more-info">
                                    <p>{tour.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <footer className="footer">
                Contact Us: info@ukrainianresorts.com
            </footer>
        </div>
    );
};

export default Catalog;
