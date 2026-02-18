import { useState, useEffect } from 'react';
import api from '../../../services/Service';
import { toast } from 'react-toastify';

export default function BookTable({ refreshTrigger, onDataChange }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Reload books whenever the dashboard signals a change
  useEffect(() => {
    loadBooks();
  }, [refreshTrigger]);

  const loadBooks = async () => {
    try {
      const response = await api.get('/all');
      setBooks(response.data);
    } catch (error) {
      toast.error("Error loading library inventory.");
    }
  };

  const handleEditClick = (book) => {
    setEditingId(book.id);
    // Clone the entire book object to ensure all fields (description, imageUrl, etc.) are captured
    setEditFormData({ ...book });
  };

  const handleSave = async (id) => {
    try {
      // This sends the full object to your updated Backend PutMapping
      await api.put(`/update/${id}`, editFormData);
      setEditingId(null);
      toast.success("Book details updated and synced!");
      if (onDataChange) onDataChange(); // Triggers refresh in Stats/Loan tables
      loadBooks();
    } catch (error) {
      toast.error("Update failed. Please check your data.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      try {
        await api.delete(`/delete/${id}`);
        toast.success("Book removed from inventory.");
        if (onDataChange) onDataChange();
        loadBooks();
      } catch (error) {
        toast.error("Could not delete book. It might be currently issued.");
      }
    }
  };

  // Local filtering for fast admin searching
  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.isbn.toString().includes(searchTerm) ||
    b.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-primary">Books Inventory</h5>
        <div className="input-group w-50">
          <span className="input-group-text bg-light border-end-0">🔍</span>
          <input 
            type="text" 
            className="form-control form-control-sm border-start-0" 
            placeholder="Search by Title, Author, or ISBN..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
          <thead className="table-light">
            <tr>
              <th>Cover</th>
              <th>Book Details</th>
              <th>ISBN & Category</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id}>
                  {/* Column 1: Image */}
                  <td style={{ width: '80px' }}>
                    {editingId === book.id ? (
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value={editFormData.imageUrl} 
                        placeholder="Image URL"
                        onChange={(e) => setEditFormData({...editFormData, imageUrl: e.target.value})} 
                      />
                    ) : (
                      <img 
                        src={book.imageUrl || 'https://via.placeholder.com/45x60'} 
                        alt="cover" 
                        className="rounded shadow-sm" 
                        style={{ width: '45px', height: '60px', objectFit: 'cover' }} 
                      />
                    )}
                  </td>

                  {/* Column 2: Details (Title, Author, Description) */}
                  <td style={{ maxWidth: '250px' }}>
                    {editingId === book.id ? (
                      <>
                        <input 
                          type="text" 
                          className="form-control form-control-sm mb-1 fw-bold" 
                          value={editFormData.title} 
                          onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} 
                        />
                        <input 
                          type="text" 
                          className="form-control form-control-sm mb-1" 
                          value={editFormData.authorName} 
                          onChange={(e) => setEditFormData({...editFormData, authorName: e.target.value})} 
                        />
                        <textarea 
                          className="form-control form-control-sm" 
                          rows="2"
                          value={editFormData.description} 
                          onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                          placeholder="Short description..."
                        />
                      </>
                    ) : (
                      <div title={book.description} style={{ cursor: 'help' }}>
                        <div className="fw-bold text-dark">{book.title}</div>
                        <div className="text-muted small">by {book.authorName}</div>
                        <div className="text-truncate text-secondary extra-small" style={{ fontSize: '0.7rem' }}>
                          {book.description ? book.description.substring(0, 40) + "..." : "No description"}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Column 3: ISBN & Category */}
                  <td>
                    {editingId === book.id ? (
                      <>
                        <input 
                          type="number" 
                          className="form-control form-control-sm mb-1" 
                          value={editFormData.isbn} 
                          onChange={(e) => setEditFormData({...editFormData, isbn: e.target.value})} 
                        />
                        <select 
                          className="form-select form-select-sm" 
                          value={editFormData.category} 
                          onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                        >
                          <option value="General">General</option>
                          <option value="Technology">Technology</option>
                          <option value="Science">Science</option>
                          <option value="Fiction">Fiction</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <div className="text-dark">{book.isbn}</div>
                        <span className="badge bg-light text-secondary border fw-normal">{book.category}</span>
                      </>
                    )}
                  </td>

                  {/* Column 4: Status */}
                  <td>
                    {editingId === book.id ? (
                      <select 
                        className="form-select form-select-sm" 
                        value={editFormData.status} 
                        onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                      >
                        <option value="Available">Available</option>
                        <option value="Issued">Issued</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Lost">Lost</option>
                      </select>
                    ) : (
                      <span className={`badge rounded-pill ${book.status === 'Available' ? 'bg-success-subtle text-success border border-success' : 'bg-warning-subtle text-dark border border-warning'}`}>
                        {book.status}
                      </span>
                    )}
                  </td>

                  {/* Column 5: Actions */}
                  <td className="text-end">
                    {editingId === book.id ? (
                      <div className="btn-group">
                        <button className="btn btn-sm btn-success" onClick={() => handleSave(book.id)}>Save</button>
                        <button className="btn btn-sm btn-light border" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditClick(book)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  No books found in the inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}