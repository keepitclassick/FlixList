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
import Login from "./components/Login";
import Register from "./components/Register";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);

  const getMovies = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=8186b72e`;

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
    const user = JSON.parse(localStorage.getItem("userID"));

    setFavourites(movieFavourites);
    setRatings(movieRatings);
    setLoggedIn(user);
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

  const logout = () => {
    const user = JSON.parse(localStorage.getItem("userID"));
    if (user) {
      localStorage.removeItem("userID");
      setLoggedIn(false);
    }
  };

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const user = JSON.parse(localStorage.getItem("userID"));

  return (
    <>
      <div className="container-fluid movie-app" data-theme={theme}>
        <nav class="navbar navbar-custom">
          <h1 class="title">
            FlixList{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-camera-reels-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
            </svg>
            <br />
            <button id="mode" onClick={switchTheme}>
              Switch to {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </h1>

          <form class="form-inline d-flex">
            {user ? (
              <button id="logout" onClick={logout}>
                Logout
              </button>
            ) : null}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
            />
          </form>
        </nav>
        <div className="row d-flex align-items-center mt-4 mb-4">
          {!searchValue || !movies ? (
            <center>
              <h2>No Search Entered. Search above!</h2>
            </center>
          ) : (
            <MovieListHeading heading="Search Results" />
          )}
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            FavouritesComponent={AddFavourites}
            handleFavouritesClick={addFavouriteMovie}
            addRatings={addRatings}
          />
        </div>

        {loggedIn ? (
          <>
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
          </>
        ) : null}
        {!loggedIn && !register ? (
          <div>
            <center>
              <h2>
                <p> Log in for your FlixList</p>
              </h2>
              <Login setLoggedIn={setLoggedIn} setRegister={setRegister} />
            </center>
          </div>
        ) : null}
        {register ? (
          <Register setLoggedIn={setLoggedIn} setRegister={setRegister} />
        ) : null}
      </div>
    </>
  );
}

export default App;
