import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movies/moviesActions';
import { selectMoviesData } from '../redux/movies/moviesSelectors';
import Movie from '../components/Movie';

const HomePage = ()=>{

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchMovies());
    },[dispatch]);
    const movies = useSelector(selectMoviesData);
    return  <Box sx={{ flexGrow: 1 ,m: 2}}>
    <Grid container spacing={2}>
      {
        movies.map(movie=> <Grid xs={6} md={4}>
         <Movie movie={movie} />
        </Grid>)

      }
     
    </Grid>
  </Box>
}

export default HomePage;