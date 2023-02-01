import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLayoutFromId, selectMovieFromId } from "../redux/movies/moviesSelectors";
import { getCodeFromValue } from "../utils/helpers";
import { BOOKING_CHARGE, PAYMENT_TIME, TICKET_COST } from "../utils/constants";
import { updateBookedStart } from "../redux/movies/moviesActions";

const Payment = () => {
    const [params,setSearchParams] =useSearchParams();
    const seats=params.get("seatDetails").split(",");
    const movieId=params.get("movieId");
    const movie     = useSelector(selectMovieFromId(movieId));
    const layout    = useSelector(selectLayoutFromId(movieId));
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [timer, setTimer] = React.useState(PAYMENT_TIME);
    const id =React.useRef(null);
    const clear=()=>{
    window.clearInterval(id.current)
  }
    React.useEffect(()=>{
       id.current=window.setInterval(()=>{
        setTimer((time)=>time-1)
      },1000)
      return ()=>clear();
    },[])
  
    React.useEffect(()=>{
      if(timer===0){
        clear()
      }
  
    },[timer])
  
    const updateBooked = ()=>{
        dispatch(updateBookedStart({id:parseInt(movieId),booked:seats.map(single=>parseInt(single))}));
        navigate(-1);
    }
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
   >
      <Grid item sx={{mt:7,minWidth:450}}>
        <Card>
          <CardContent>
            <Grid container>
                <Grid item xs={2}>
                <ArrowBackIcon onClick={()=>navigate(-1)} sx={{ mt:2 }} fontSize="20px" />
                </Grid>
                <Grid item xs={8}>
                <Typography
              sx={{ fontSize: 22 }}
           
              align="center"
              component={"div"}
              color="text.secondary"
              gutterBottom
            >
           Booking Summary
            </Typography>
                </Grid>
             
            </Grid>
            <Typography sx={{ fontSize: 20 }} align="center" component="div">
             {movie.title}({movie.theatre})
            </Typography>
            <Grid sx={{ display: "flex",mt:2, justifyContent: "space-between" }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {seats.map((seat,index)=>{
                const val= getCodeFromValue(Math.ceil(parseInt(seat)/layout.row))+""+parseInt(seat)%layout.row
                    if(index!=seats.length-1)
                        return val+",";
                    else
                        return val;
              })} ({seats.length})
            </Typography>
           
            <Typography variant="body2">
            RS. {seats.length*TICKET_COST} 
            </Typography>
            </Grid>

            <Grid sx={{ display: "flex",mt:2, justifyContent: "space-between" }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Booking Charge
            </Typography>
           
            <Typography variant="body2">
            RS. {seats.length*BOOKING_CHARGE}
            </Typography>
            </Grid>
            <Divider />
            <Grid sx={{ display: "flex",mt:2, justifyContent: "space-between" }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Total
            </Typography>
           
            <Typography variant="body2">
            RS. {seats.length*BOOKING_CHARGE + seats.length*TICKET_COST}
            </Typography>
            </Grid>
            <Typography align="center">
            <Button color="secondary" disabled={timer==0} onClick={updateBooked}
                variant="contained"> CONFIRM BOOKING {timer>0&&timer}</Button>
            </Typography>
         
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Payment;
