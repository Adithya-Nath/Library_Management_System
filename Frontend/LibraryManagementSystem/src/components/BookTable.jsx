// src/components/BookTable.jsx
import { useState } from 'react';
import { initialBooks } from './mockData';

export default function BookTable() {
  // Example local data
  const [books] = useState(initialBooks);


  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3">
        <h5 className="mb-0">Current Inventory</h5>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Book Detail</th>
              <th>ISBN</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                  <div className="fw-bold">{book.title}</div>
                  <div className="text-muted small">{book.author}</div>
                </td>
                <td>{book.isbn}</td>
                <td>
                  <span className={`badge rounded-pill ${book.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
                    {book.status}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}