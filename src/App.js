import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './App.css'; // Import CSS file
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Register from "./pages/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [count, setCount] = useState(0); // This state seems unused, consider removing if not needed

    return (
        <div className="App">
            <div className="nav-menu">
                <Link className="nav-link" to='/'>Home</Link>
                <Link className="nav-link" to='/catalog'>Catalog</Link>
                <Link className="nav-link" to='/register'>Register</Link>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
