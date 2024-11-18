import React from 'react';
import Home from './main_page/Home';
import SingleMovie from './movie_page/SingleMovie';
import Error from './Error';
import {Routes, Route} from "react-router-dom";
import "./App.css";


const App = () => {
  return (
  <>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="movie/:id" element = {<SingleMovie/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
  </>
  );
};

export default App;