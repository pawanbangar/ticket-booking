import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MOVIE_DETAILS_PREFIX } from '../utils/constants';

const Movie = ({movie}) =>{
    const navigate = useNavigate();

    return <Card onClick={()=>navigate(`${MOVIE_DETAILS_PREFIX+movie.id}`)}>
    <CardActionArea>
      <CardMedia
        component="img"
        height={"220px"}
        image={movie.image}
        alt="Image"
      />
      <CardContent>
        <Typography align='center' gutterBottom variant="h4" letterSpacing={0.5} component="div">
          {movie.title} ({movie.theatre})
        </Typography>
        <Typography align='center'  variant="body1" color="text.secondary">
            {movie.language}
          </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
};

export default Movie;