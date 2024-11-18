import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show: "false", msg: ""});
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    //function that catch the informations of the API
    const getMovies = async (url) =>{
        setIsLoading(true);
        try{
            const res = await fetch(url)
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovie(data.Search);
            }else{
                setIsError({
                    show: true,
                    msg: data.Error,
                })
            }
        }
        catch(error){
            console.log(error)
        }
    }
    //useEffect to get the movies when complete the requisites
useEffect(() => {
    if (query.trim() === "") {
        setMovie([]); // Reset movies if query is empty
        setIsError({ show: false, msg: "" }); // Reset error
        return;
    }
    //Debounce
    let timer = setTimeout(() => {
        getMovies(`${API_URL}&s=${query}&page=${page}`);
    }, 500);

    return () => clearTimeout(timer);
    }, [query, page]);

    return (
        <AppContext.Provider value={{isLoading, isError, movie, query, setQuery, page, setPage}}>
            {children}
        </AppContext.Provider>
        );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};