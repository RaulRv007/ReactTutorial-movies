import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css";
import { searchMovies } from "../services.js/api";
import { getPopularMovies } from "../services.js/api";
//to say when the funitons are called, otherwise they would be called avery single time I do a change in the component
import { useEffect } from "react";
import { use } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        setError("failed to load popular movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();


    if (!searchQuery.trim()) {
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
    } catch (err) {
      setError("failed to search movies");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
