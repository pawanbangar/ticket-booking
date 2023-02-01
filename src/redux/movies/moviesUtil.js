
function getDefaultLayoutFromMovies(movies) {

  return movies.map(movie=>{
    return {
      id:movie.id,
      row:20,
      cols:6,
      blocked:[]
    }
  })
}
function getDefaultBookedFromMovies(movies) {

  return movies.map(movie=>{
    return {
      id:movie.id,
      booked:[]
    }
  })
}
export  {getDefaultLayoutFromMovies,getDefaultBookedFromMovies};
