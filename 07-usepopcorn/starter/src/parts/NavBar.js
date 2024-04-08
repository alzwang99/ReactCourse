import { useState, useEffect } from "react"

const KEY = "2908227a"

export const NavBar = ({ children }) => {

    return (
        <nav className="nav-bar">{children}
        </nav>
    )
}

export const Logo = () => {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

export const SearchBar = ({ setQuery, query, setMovies, setLoading }) => {

    const [searchResult, setSearchResult] = useState("")

    useEffect(function () {
        async function fetchMovies() {
            try {
                if (!searchResult) return;
                setLoading(true)
                const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${searchResult}`)
                if (!res.ok) {
                    throw new Error(`We cannot find movies with ${searchResult}`)
                }
                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error(`We cannot find movies with ${searchResult}`)
                }
                setMovies(data.Search)
                setLoading(false)
            }
            catch (err) {
                console.error(`Fetch operation failed : ${err.message}`)
            }
        }
        fetchMovies();
    }, [searchResult, setMovies])

    const updateQuery = (e) => {
        setQuery(e.target.value);
    }

    const updateSearchResult = (e) => {
        setSearchResult(e.target.value);
    }

    return (<input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={updateQuery}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                updateSearchResult(e)
            }
        }}
    />)
}

export const Results = ({ moviesLength }) => {
    return (
        <p className="num-results">
            Found <strong>{moviesLength}</strong> results
        </p>
    )
}