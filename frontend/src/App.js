import "./App.css";

//router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
        </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
