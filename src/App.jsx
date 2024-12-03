import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState(""); 
  const [books, setBooks] = useState([]); 
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); 
    }, 500); 

    return () => clearTimeout(timer); 
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchBooks(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchBooks = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      const bookTitles = response.data.items.map((item) => item.volumeInfo.title);
      setBooks(bookTitles);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };
  
  return (
    <div className="App">
      <h1>Find a Book</h1>
      {/* กล่องข้อความ Input */}
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter book title, author, or keyword"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>

      {/* แสดงผลลัพธ์ */}
      <ul>
        {books.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
