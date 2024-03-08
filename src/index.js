import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Movie from './Routers/Movie.jsx';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
