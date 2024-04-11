import { useState, useEffect } from "react"
import { Ratings } from "./Ratings";
import { useEscapeKey, useLocalStorageList, useMovieDetails, useTitleChange } from "./customHooks";

const KEY = "2908227a"

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


export const Main = ({ children }) => {

    return (
        <main className="main">{children}</main>
    )
}

export const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <Button open={isOpen} setOpen={setIsOpen} />
            {isOpen && children}
        </div>
    )
}

const Button = ({ setOpen, open }) => {
    return (
        <button className="btn-toggle" onClick={() => setOpen((open) => !open)}>
            {open ? "–" : "+"}
        </button>
    )
}

export const SearchList = ({ movies, setSelectedId, selectedId }) => {

    const handleSelectedMovie = (id) => {
        selectedId === id ? setSelectedId(null) : setSelectedId(id)
    }

    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <li key={movie.imdbID} onClick={() => handleSelectedMovie(movie.imdbID)}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                        <p>
                            <span>🗓</span>
                            <span>{movie.Year}</span>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export const SelectedMovie = ({ selectedId, setSelectedId, setWatched, watched }) => {

    const [movieDetail, setMovieDetail] = useState({});
    const [userRating, setUserRating] = useState(0)

    const { Title: title, Year: year, Poster: poster, Runtime: runtime,
        imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movieDetail;

    const watchedMovie = (movie) => {
        let found = false;
        watched.forEach((mv) => {
            if (mv.imdbID === movie.imdbID) {
                mv.userRating = movie.userRating;
                found = true;
            }
        })
        if (!found) {
            console.log("hit1")
            setWatched((watched) => [...watched, movie])
        }
    }

    const addToWatchList = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating
        };
        watchedMovie(newWatchedMovie);
        setSelectedId(null);
    }
    //Custom hook to get selected movie details
    useMovieDetails(KEY, selectedId, setMovieDetail)
    //Custom hook for changing title of page
    useTitleChange(selectedId, title);
    //Custom hook for using escapeKey
    useEscapeKey(setSelectedId)

    return <div className="details">
        <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>&larr;</button>
            <img src={poster} alt={`Poster of ${movieDetail} movie`} />
            <div className="details-overview">
                <h2>{title}</h2>
                <p>{released} &bull; {runtime}</p>
                <p>{genre}</p>
                <p><span>⭐</span>{imdbRating} IMDb Rating</p>
            </div>
        </header>

        <section>
            <div className="rating">
                <Ratings size={24} onSetRating={setUserRating} />
                {userRating > 0 &&
                    <button className="btn-add" onClick={addToWatchList}>Add to list</button>
                }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
        </section>
    </div>
}

export const WatchedStats = ({ watched }) => {



    const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
    const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
    const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0);

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}

export const WatchedList = ({ watched, setWatched }) => {

    const deleteWatchedMovie = (mov) => {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== mov.imdbID))
        console.log("hit2")
    }

    //Custom hook for local storage
    useLocalStorageList(watched);

    return (
        <ul className="list">
            {watched.map((movie) => (
                <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                        <p>
                            <span>⭐️</span>
                            <span>{movie.imdbRating}</span>
                        </p>
                        <p>
                            <span>🌟</span>
                            <span>{movie.userRating}</span>
                        </p>
                        <p>
                            <span>⏳</span>
                            <span>{movie.runtime} min</span>
                        </p>
                        <button className="btn-delete" onClick={() => deleteWatchedMovie(movie)}>X</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}