import React, { useState } from "react";
import axios from "axios";

function Search({ setSearchResults }) {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/search", { query });
            setSearchResults(response.data); // Pass results to parent component
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]); // Clear results on error
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input
                type="text"
                placeholder="Type your question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Search
            </button>
        </div>
    );
}

export default Search;
