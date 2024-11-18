import React from 'react'
import { useGlobalContext } from '../context'
import "./Search.css"

const Search = () => {

  const {query, setQuery, isError, page, setPage} = useGlobalContext();

    // Function to handle the Next button click
    const handleNextPage = () => {
      setPage(prevPage => prevPage + 1); // Increment page
    };
      // Function to handle the Previous button click
    const handlePreviousPage = () => {
      setPage(prevPage => Math.max(prevPage - 1, 1)); // Decrement page but not below 1
    };
    const handleFirstPage = () => {
      setPage(prevPage => prevPage = 1); // Decrement page but not below 1
    };
    const handleLastPage = () => {
      setPage(prevPage => prevPage = 100); // Decrement page but not below 1
    };


  return (
    <section className = "search-section">
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Find your movie here</h2>
          <input type="text" placeholder='Search' id="searchInput" value={query} onChange={(e) =>setQuery(e.target.value)}></input>
        </div>
      </form>
      <div className="card-error">
          <p>{isError.show && isError.msg}</p>
      </div>
      <div className="button-page">
        <button onClick={handleFirstPage} disabled={page === 1}>First page</button>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page === 100}>Next</button>
        <button onClick={handleLastPage} disabled={page === 100}>Last page</button>
      </div>
      <p>Page: {page}</p>
    </section>
  );
};

export default Search;