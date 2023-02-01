import { Button, Container, Grid, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper'
import { useParams } from "react-router-dom";
import { selectMovieFromId } from "../redux/movies/moviesSelectors";
import { getCodeFromValue } from "../utils/helpers";
const CustomizeRow = () => {
  const { id } = useParams();
  const movie = useSelector(selectMovieFromId(id));
  const [row, setRow] = useState(20);
  const [col, setColumn] = useState(6);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


//   Single Row
  const data=[];

  for(let i=1;i<=row;i++)
  {
    data.push(<Grid key={i} item>
        <Item>{i}</Item>
      </Grid>);
  }
  const columns = Array.from({length: col}, (v, k) => k+1);


  return (
    <>
      <Typography align="center" variant="h4" sx={{ mt: 2 }}>
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
          color="success"
          variant="contained"
          sx={{
            mt: 1,
            ml: 1.5,
          }}
        >
          {" "}
          Customize Row{" "}
        </Button>
      </Typography>
      <Container fixed sx={{ mt: 3 }}>
        <Grid container spacing={1}>
          {columns.map((val, index) => {
            const code=getCodeFromValue(val);
            return (
            <Grid key={index} container item spacing={1}>
                <Typography align="center" sx={{ mt:1.5,mr:1 }} variant="h6">{ code.split("").reverse().join("") }</Typography>
              {data}{" "}
            </Grid>
          )})}
        </Grid>
      </Container>
    </>
  );
};

export default CustomizeRow;
