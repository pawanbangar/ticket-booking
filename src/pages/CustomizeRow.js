import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { selectLayoutFromId, selectMovieFromId } from "../redux/movies/moviesSelectors";
import { getCodeFromValue } from "../utils/helpers";
import { red } from "@mui/material/colors";
import { updateLayoutStart } from "../redux/movies/moviesActions";
const CustomizeRow = () => {
  const { id } = useParams();
  const movie = useSelector(selectMovieFromId(id));
  const layout =  useSelector(selectLayoutFromId(id));
  const [row, setRow] = useState(layout.row);
  const [col, setColumn] = useState(layout.cols);
  const dispatch = useDispatch();
  const saveLayout =()=>{
    dispatch(updateLayoutStart({id:parseInt(id),row:parseInt(row),cols:parseInt(col)}));
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //   Single Row
  const data = [];

  for (let i = 1; i <= row; i++) {
    data.push(
      <Grid key={i} sx={{ m: 1 }} item>
        <Item sx={{ p: 1 }}>{i}</Item>
      </Grid>
    );
  }
  const columns = Array.from({ length: col }, (v, k) => k + 1);

  return (
    <>
      <Typography align="center" variant="h4" sx={{ mt: 3 }}>
        {movie.title} ({movie.theatre})
      </Typography>
      <Typography align="center" variant="h6" sx={{ mt: 4 }}>
        <TextField
          label={"Row"}
          size={"small"}
          type={"number"}
          sx={{ mr: 3 }}
          margin="dense"
          value={row}
          onChange={(e) => setRow(e.target.value)}
        />
        <TextField
          label={"Column"}
          size={"small"}
          type={"number"}
          margin="dense"
          value={col}
          onChange={(e) => setColumn(e.target.value)}
        />
        <Button
        onClick={saveLayout}
          color="secondary"
          variant="contained"
          sx={{
            mt: 1,
            ml: 1.5,
          }}
        >
          Save Setup{" "}
        </Button>
      </Typography>

      <Typography align="center" variant="h5" sx={{ mt: 4 }}>
        Select Seats to be <span style={{ color: red[500] }}>Blocked</span>
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
              key={index}
              item
              spacing={1}
              display="flex"
              flexDirection="row"
            >
              <Typography align="center" sx={{ mt: 1.5, mr: 1.5 }} variant="h6">
                {code}
              </Typography>
              {data}{" "}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CustomizeRow;
