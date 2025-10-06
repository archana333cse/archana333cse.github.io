import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Search results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
