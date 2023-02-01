
function getDefaultLayoutFromMovies(movies) {

  return movies.map(movie=>{
    return {
      id:movie.id,
      row:20,
      cols:6
    }
  })
}

function getDefaultBlockedFromMovies(movies) {

  return movies.map(movie=>{
    return {
      id:movie.id,
      blockedIds:[]
    }
  })
}

export  {getDefaultLayoutFromMovies,getDefaultBlockedFromMovies};
