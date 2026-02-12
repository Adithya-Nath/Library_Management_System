// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="input-group mb-4 shadow-sm">
      <span className="input-group-text bg-white border-end-0">
        🔍
      </span>
      <input
        type="text"
        className="form-control border-start-0 ps-0"
        placeholder="Search books by title, author, or ISBN..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}