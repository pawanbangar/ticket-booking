import { getPosition } from "../utils/helpers";
import React from "react";
import { useSelector } from "react-redux";
import { selectBookedTickets } from "../redux/movies/moviesSelectors";
import { Grid, Paper, styled } from "@mui/material";
import { brown, red } from "@mui/material/colors";

const BookingMatrixRow = ({id,layout,bookTickets,setBookTickets,tmpCol,tmpRow,i}) =>{
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
      }));
      const calculateBookedTickets = ({ tmpCol, tmpRow }) => {
        const position = getPosition({
          col: tmpCol,
          row: tmpRow,
          rows: layout.row,
        });
        if (!bookTickets.includes(position))
          setBookTickets([...bookTickets, position]);
        else {
          const index = bookTickets.indexOf(position);
          let data = bookTickets;
          data.splice(index, 1);
          setBookTickets([...data]);
        }
      };
    const bookedTickets = useSelector(selectBookedTickets(id));
    const position = getPosition({
        row: tmpRow,
        col: tmpCol,
        rows: layout.row,
      });
      const isBooking = bookTickets.includes(position);
      const isBooked = bookedTickets.includes(position);
      const isBlocked = layout.blocked.includes(position);
      return (
        <Grid
          key={i}
          onClick={() =>
            !isBlocked &&
            !bookedTickets.includes(position) &&
            calculateBookedTickets({ tmpCol, tmpRow })
          }
          sx={{ m: 1, cursor: isBlocked ? "auto" : "pointer" }}
          item
        >
          {!isBlocked ? (
            <Item
              sx={{
                p: 1,
                background: isBooking
                  ? red[500]
                  : isBooked
                  ? brown[100]
                  : "#fff",
                color: isBooking ? "#fff" : "#00000099",
              }}
            >
              {tmpRow}
            </Item>
          ) : (
            <div style={{ height: "30px", width: "29px" }}> </div>
          )}
        </Grid>
      );
}

export default BookingMatrixRow;