import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import FavouriteList from "./components/FavouriteList";
import useLocalStorage from "use-local-storage";
import axios from "axios";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const [ratings, setRatings] = useState([]);

  const getMovies = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8186b72e`;

    const res = await fetch(url);
    const resJson = await res.json();
    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const addRatings = (movie) => {
    const newRatings = [...ratings, movie];

    const saveRatings = (ratings) => {
      localStorage.setItem("movie-app-ratings", JSON.stringify(ratings));
    };

    setRatings(newRatings);
    saveRatings(newRatings);
  };

  useEffect(() => {
    getMovies(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("movie-app-favourites")
    );

    const movieRatings = JSON.parse(localStorage.getItem("movie-app-ratings"));

    setFavourites(movieFavourites);
    setRatings(movieRatings);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-app-favourites", JSON.stringify(items));
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeMovieRating = (movie) => {
    const saveRatings = (ratings) => {
      localStorage.setItem("movie-app-ratings", JSON.stringify(ratings));
    };

    const newRatingList = ratings.filter(
      (rating) => rating.imdbID !== movie.imdbID
    );
    setFavourites(newRatingList);
    saveRatings(newRatingList);
  };

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <div className="container-fluid movie-app" data-theme={theme}>
        <nav class="navbar navbar-custom">
          <h1 class="title">
            FlixList <br />
            <button onClick={switchTheme}>
              Switch to {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </h1>

          <form class="form-inline d-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-search-heart"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0-7.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"
              />
            </svg>
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />{" "}
          </form>
        </nav>

        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Search Results" />{" "}
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            FavouritesComponent={AddFavourites}
            handleFavouritesClick={addFavouriteMovie}
            addRatings={addRatings}
          />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Watch List" />
        </div>
        <div className="row">
          <FavouriteList
            movies={favourites}
            FavouritesComponent={RemoveFavourites}
            handleFavouritesClick={removeFavouriteMovie}
          />
        </div>
      </div>
    </>
  );
}

export default App;
