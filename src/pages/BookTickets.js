import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectLayoutFromId,
  selectMovieFromId,
} from "../redux/movies/moviesSelectors";
import { getCodeFromValue } from "../utils/helpers";
import { TICKET_COST } from "../utils/constants";
import BookingMatrixRow from "../components/BookingMatrixRow";

const BookTickets = () => {
  const { id } = useParams();
  const movie = useSelector(selectMovieFromId(id));
  const layout = useSelector(selectLayoutFromId(id));
  const [bookTickets, setBookTickets] = useState([]);

  const navigate = useNavigate();


  const startTicketBooking = () => {
    navigate("/payment?" + "movieId=" + id + "&seatDetails=" + bookTickets);
  };

  const columns = Array.from({ length: layout.cols }, (v, k) => k + 1);
  const rows = Array.from({ length: layout.row }, (v, k) => k + 1);
  return (
    <>
      <Typography align="center" variant="h4" sx={{ mt: 3 }}>
        {movie.title} ({movie.theatre})
      </Typography>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ ml: 2 }}
      >
        {columns.map((val, index) => {
          const code = getCodeFromValue(val);
          return (
            <Grid
              key={index*val}
              item
              spacing={1}
              display="flex"
              flexDirection="row"
            >
              <Typography align="center" sx={{ mt: 1.5, mr: 1.5 }} variant="h6">
                {code}
              </Typography>
              {rows.map((v, i) => 

                <BookingMatrixRow key={i*id} i={i} id={id} setBookTickets={setBookTickets} layout={layout} bookTickets={bookTickets} tmpCol={val} tmpRow={v} />
              )}
            </Grid>
          );
        })}

        <Typography align="center" sx={{ mt: 1.5, mr: 1.5 }} variant="h6">
          {bookTickets.length > 0 && (
            <Button
              onClick={startTicketBooking}
              color="secondary"
              variant="contained"
              sx={{
                mt: 1,
                ml: 1.5,
              }}
            >
              Pay {TICKET_COST * bookTickets.length} RS
            </Button>
          )}
        </Typography>
      </Grid>
    </>
  );
};

export default BookTickets;
