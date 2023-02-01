import React from "react";
import {Routes,Route} from "react-router-dom";
import CustomizeRow from "./CustomizeRow";
import HomePage from "./HomePage";
import MovieDetails from "./MovieDetails";
const RoutesPage = () =>{
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/details/:id" element={<MovieDetails/>}/>
        <Route path="/customize/:id" element={<CustomizeRow/>}/>
    </Routes>
}

export default RoutesPage;