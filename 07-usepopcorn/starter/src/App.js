import { useState } from "react";
import { NavBar, Logo, SearchBar, Results } from "./parts/NavBar";
import { Main, Box, SearchList, WatchedList, WatchedStats, SelectedMovie } from "./parts/Main"
import { tempMovieData } from "./parts/Data";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  const [watched, setWatched] = useState(
    function () {
      const storedValue = localStorage.getItem("watched");
      return storedValue ? JSON.parse(storedValue) : [];
    }
  );
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const Loader = () => {
    return <p className="loader">Loading...</p>
  }


  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar setMovies={setMovies} query={query} setQuery={setQuery} setLoading={setIsLoading} />
        <Results moviesLength={movies.length} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? <Loader /> : <SearchList movies={movies} setSelectedId={setSelectedId} selectedId={selectedId} />}
        </Box>

        <Box>
          {
            selectedId ? <SelectedMovie selectedId={selectedId} setSelectedId={setSelectedId} setWatched={setWatched} watched={watched} /> :
              <>
                <WatchedStats watched={watched} />
                <WatchedList watched={watched} setWatched={setWatched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}

