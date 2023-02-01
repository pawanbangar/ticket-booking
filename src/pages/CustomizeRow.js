import { Button, Grid, rgbToHex, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { selectLayoutFromId, selectMovieFromId } from "../redux/movies/moviesSelectors";
import { getCodeFromValue, getPosition } from "../utils/helpers";
import { red } from "@mui/material/colors";
import { updateLayoutStart } from "../redux/movies/moviesActions";
import { MOVIE_DETAILS_PREFIX } from "../utils/constants";
const CustomizeRow = () => {
  const { id } = useParams();
  const movie = useSelector(selectMovieFromId(id));
  const layout =  useSelector(selectLayoutFromId(id));
  const [row, setRow] = useState(layout.row);
  const [col, setColumn] = useState(layout.cols);
  const [blockedPosition,setBlockedPosition] = useState(layout.blocked);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveLayout =()=>{

    dispatch(updateLayoutStart({id:parseInt(id),row:parseInt(row),cols:parseInt(col),blocked:blockedPosition}));
    navigate(MOVIE_DETAILS_PREFIX+id);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const calculateBlockedPosition = ({tmpCol,tmpRow}) =>{

      const position= getPosition({col:tmpCol,row:tmpRow,rows:row});
      if(!blockedPosition.includes(position))
        setBlockedPosition([...blockedPosition,position]);
      else{
        const index =blockedPosition.indexOf(position);
        let data = blockedPosition;
        data.splice(index,1);
        setBlockedPosition([...data]);
      }
  }


  const columns = Array.from({ length: col }, (v, k) => k + 1);
  const rows = Array.from({ length: row }, (v, k) => k + 1);
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
              {rows.map((v, i) => {
                
                const isBlocked = blockedPosition.includes( getPosition({row:v,col:val,rows:row}));
            
                return (
                <Grid
                  key={i}
                  onClick={() =>
                    calculateBlockedPosition({ tmpCol: val, tmpRow: v })
                  }
                  sx={{ m: 1 ,cursor:"pointer"}}
                  item
                >
                  <Item sx={{ p: 1,background: isBlocked?red[500]:"#fff",color:isBlocked?"#fff":"#00000099" }}>
                    {v}
                  </Item>
                </Grid>
              );})
  }
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CustomizeRow;
