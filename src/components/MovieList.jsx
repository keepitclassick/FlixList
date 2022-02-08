import Rating from "../components/Rating";

const MovieList = (props) => {
  const FavouritesComponent = props.FavouritesComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <>
          <div class="image-container col-sm">
            <img id="moviePic " src={movie.Poster} alt="movie" height="300" />
            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavouritesComponent />
            </div>
          </div>

          <Rating />
        </>
      ))}
    </>
  );
};

export default MovieList;
