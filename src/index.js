import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Movie} from './Routers/Movie'
import { BrowserRouter, Routes, Router, Route} from "react-router-dom";

import './styles/main.scss'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
            <Route path='/' element={<App/>}/>
            <Route path='/movie:id' element={<Movie/>}/>
            <Route path='/' element={<App/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

);


