import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

// 6845a8f8

const API_URL = "https://www.omdbapi.com?apikey=6845a8f8";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  /**
   *
   * @param {*} title
   * @returns null
   * @description This function fetches movies from the OMDB API based on the title provided.
   */
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search);
  };

  // useState is a Hook that lets you add React state to function components.
  // API call to fetch movies
  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.imdbID} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {/* <div className="container">
        <MovieCard movie1={movies[0]} />
      </div> */}
    </div>
  );
}

export default App;
