import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // 1. Set a timer to trigger the search after 500ms of inactivity
    const delayDebounceFn = setTimeout(() => {
      if (onSearch) onSearch(query);
    }, 500);

    // 2. Clean up the timer if the user types again before 500ms is up
    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  return (
    <div className="input-group mb-4 shadow-sm">
      <span className="input-group-text bg-white border-end-0">🔍</span>
      <input
        type="text"
        className="form-control border-start-0 ps-0 shadow-none"
        placeholder="Search books by title, author, or ISBN..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}