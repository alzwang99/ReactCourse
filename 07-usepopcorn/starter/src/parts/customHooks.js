'use strict'

import { useEffect } from "react"

export const useEscapeKey = (setSelectedId) => {

    useEffect(function () {
        function callback(e) {
            if (e.code === "Escape") {
                setSelectedId(null)
            }
        }
        document.addEventListener("keydown", callback)

        return function () {
            document.removeEventListener("keydown", callback)
        }
    }, [setSelectedId])

}

export const useMovieDetails = (KEY, selectedId, setMovieDetail) => {

    useEffect(function () {
        const getMovieDetails = async () => {
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
                if (!res.ok) {
                    throw new Error(`Fetching failed`)
                }
                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error(`We cannot find the movie with ${selectedId}`)
                }
                setMovieDetail(data);
            } catch (err) {
                console.error(err)
            }
        }
        getMovieDetails();
    }, [selectedId])
}

export const useTitleChange = (selectedId, title) => {
    useEffect(function () {
        selectedId ? document.title = `Watching | ${title}` : document.title = "usePopcorn";

        return function () {
            document.title = "usePopcorn";
        }
    }, [selectedId, title]);
}

export const useLocalStorageList = (watched) => {
    useEffect(
        function () {
            localStorage.setItem("watched", JSON.stringify(watched));
        }, [watched]
    );

}