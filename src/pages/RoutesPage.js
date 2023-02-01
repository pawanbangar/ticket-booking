import React from "react";
import {Routes,Route} from "react-router-dom";
import BookTickets from "./BookTickets";
import CustomizeRow from "./CustomizeRow";
import HomePage from "./HomePage";
import MovieDetails from "./MovieDetails";
import Payment from "./Payment";
const RoutesPage = () =>{
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/details/:id" element={<MovieDetails/>}/>
        <Route path="/customize/:id" element={<CustomizeRow/>}/>
        <Route path="/seats/:id" element={<BookTickets/>}/>
        <Route path="/payment" element={<Payment/>}/>
    </Routes>
}

export default RoutesPage;