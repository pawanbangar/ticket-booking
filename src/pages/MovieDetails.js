import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectMovieFromId } from "../redux/movies/moviesSelectors";
import { CUSTOMIZE_ROW_PREFIX, TICKET_COST } from "../utils/constants";
import Button from '@mui/material/Button'

const MovieDetails = () =>{
    const {id} = useParams();
    const movie = useSelector(selectMovieFromId(id));
    const navigate = useNavigate();
    return <><Typography align="center" variant="h4" sx={{ mt:2 }}>
    {movie.title} ({movie.theatre}) - {movie.language}
  </Typography>
  <Typography align="center" variant="h6" sx={{ mt:2 }}>
    Ticket Cost : {TICKET_COST} RS
  </Typography>

  <Typography align="center" variant="h6" sx={{ mt:4 }}>
   <Button color="primary" variant="contained" sx={{ mr:2 }}> Book Ticket </Button>
   <Button onClick={()=>{
    navigate(CUSTOMIZE_ROW_PREFIX+id);
   }} color="success" variant="contained"> Customize Row </Button>
  </Typography>
  </>
}

export default MovieDetails;