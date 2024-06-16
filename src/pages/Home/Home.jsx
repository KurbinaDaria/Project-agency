import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
    const [answers, setAnswers] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: []
    });
    const [result, setResult] = useState(null);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (checked) {
                setAnswers(prevAnswers => ({
                    ...prevAnswers,
                    q5: [...prevAnswers.q5, name]
                }));
            } else {
                setAnswers(prevAnswers => ({
                    ...prevAnswers,
                    q5: prevAnswers.q5.filter(item => item !== name)
                }));
            }
        } else {
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const correctAnswers = {
            q1: 'Бердянськ',
            q2: 'Львівська область',
            q3: 'Одеса',
            q4: 'Куяльник',
            q5: ['q5a', 'q5c']
        };
        let score = 0;
        score += answers.q1 === correctAnswers.q1 ? 1 : 0;
        score += answers.q2 === correctAnswers.q2 ? 1 : 0;
        score += answers.q3 === correctAnswers.q3 ? 1 : 0;
        score += answers.q4 === correctAnswers.q4 ? 1 : 0;

        // Check each checkbox answer individually
        const q5Correct = correctAnswers.q5.every(answer => answers.q5.includes(answer)) && answers.q5.every(answer => correctAnswers.q5.includes(answer));
        if (q5Correct) {
            score += 1;
        }

        setResult(`You scored ${score} out of 5.`);
    };

    return (
        <div className="home-container">
            <header style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/welcome-image1.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '70vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1>Welcome to Ukrainian Resorts</h1>
                <p>Discover your perfect getaway!</p>
            </header>
            <div className="container mt-5">
                <h2>Test your knowledge about Ukrainian Resorts!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>1. Which resort in Ukraine is known for its healing muds?</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q1" value="Скадовськ" onChange={handleInputChange} />
                            <label className="form-check-label">Skadovsk</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q1" value="Трускавець" onChange={handleInputChange} />
                            <label className="form-check-label">Truskavets</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q1" value="Бердянськ" onChange={handleInputChange} />
                            <label className="form-check-label">Berdyansk</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>2. Where is the famous Truskavets resort located?</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q2" value="Закарпатська область" onChange={handleInputChange} />
                            <label className="form-check-label">Transcarpathian Region</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q2" value="Львівська область" onChange={handleInputChange} />
                            <label className="form-check-label">Lviv Region</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q2" value="Одеська область" onChange={handleInputChange} />
                            <label className="form-check-label">Odesa Region</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>3. Which city is considered the most popular seaside resort in the south of Ukraine?</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q3" value="Одеса" onChange={handleInputChange} />
                            <label className="form-check-label">Odesa</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q3" value="Чернівці" onChange={handleInputChange} />
                            <label className="form-check-label">Chernivtsi</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="q3" value="Київ" onChange={handleInputChange} />
                            <label className="form-check-label">Kyiv</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>4. Which Ukrainian resort can you see unique pink water salt lakes?</label>
                        <select className="form-control" name="q4" onChange={handleInputChange}>
                            <option value="">Select an option</option>
                            <option value="Куяльник">Kuyalnik</option>
                            <option value="Солотвино">Solotvyno</option>
                            <option value="Асканія-Нова">Askania-Nova</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>5. Where are the resorts Bukovel and Dragobrat located? (Select all applicable)</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="q5a" onChange={handleInputChange} />
                            <label className="form-check-label">Zakarpattia Oblast</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="q5b" onChange={handleInputChange} />
                            <label className="form-check-label">Lviv Oblast</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="q5c" onChange={handleInputChange} />
                            <label className="form-check-label">Ivano-Frankivsk Oblast</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="q5d" onChange={handleInputChange} />
                            <label className="form-check-label">Ternopil Oblast</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Quiz</button>
                </form>
                {result && <p className="result-display mt-3">{result}</p>}
            </div>
            <footer className="footer mt-5">
                Contact Us: info@ukrainianresorts.com
            </footer>
        </div>
    );
}

export default Home;
