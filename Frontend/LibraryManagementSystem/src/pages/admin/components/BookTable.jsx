import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/Service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function BookTable({ refreshTrigger, onDataChange }) {
  const [books, setBooks] = useState([]);
  const [adminSearch, setAdminSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 8;

  const loadBooks = useCallback(async (page = 0, query = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/all?search=${query}&page=${page}&size=${pageSize}`);
      
      const { content, totalPages: total, number } = response.data;

      // SAFETY CHECK: If the page is empty but we aren't on page 0, go back one page
      if (content.length === 0 && page > 0) {
        loadBooks(page - 1, query);
        return;
      }

      setBooks(content || []);
      setTotalPages(total || 0);
      setCurrentPage(number || 0);
    } catch (error) {
      setBooks([]);
      toast.error("Error loading inventory.");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // Trigger load when dependencies change
  useEffect(() => {
    loadBooks(currentPage, adminSearch);
  }, [refreshTrigger, currentPage, adminSearch, loadBooks]);

  const handleSave = async (id) => {
    try {
      await api.put(`/update/${id}`, editFormData);
      setEditingId(null);
      toast.success("Updated!");
      if (onDataChange) onDataChange();
      loadBooks(currentPage, adminSearch);
    } catch (e) {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Book?',
      text: "Are you sure you want to remove this book?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/delete/${id}`);
        // Notify parent to refresh stats
        if (onDataChange) onDataChange();
        
        // Refresh the current page
        loadBooks(currentPage, adminSearch);
        
        Swal.fire('Deleted!', 'Book has been removed.', 'success');
      } catch (e) {
        toast.error("Delete failed. The book might be currently issued.");
      }
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-primary">Books Inventory</h5>
        <div className="input-group w-25 shadow-sm">
          <span className="input-group-text bg-white border-end-0">🔍</span>
          <input 
            type="text" 
            className="form-control border-start-0 shadow-none" 
            placeholder="Global Search..." 
            value={adminSearch}
            onChange={(e) => {
              setAdminSearch(e.target.value);
              setCurrentPage(0); // Reset to first page on new search
            }}
          />
        </div>
      </div>

      <div className="table-responsive">
        {loading && books.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Cover</th>
                <th>Book Details</th>
                <th>ISBN</th>
                <th>Status</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img 
                        src={book.imageUrl || 'https://via.placeholder.com/45x60'} 
                        style={{ width: '45px', height: '60px', objectFit: 'cover' }} 
                        className="rounded shadow-sm" 
                        alt="" 
                      />
                    </td>
                    <td>
                      {editingId === book.id ? (
                        <input 
                          className="form-control form-control-sm" 
                          value={editFormData.title} 
                          onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} 
                        />
                      ) : (
                        <>
                          <div className="fw-bold">{book.title}</div>
                          <div className="text-muted small">{book.authorName}</div>
                        </>
                      )}
                    </td>
                    <td>{book.isbn}</td>
                    <td>
                      <span className={`badge rounded-pill ${book.status === 'Available' ? 'bg-success-subtle text-success border border-success' : 'bg-warning-subtle text-dark border border-warning'}`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      {editingId === book.id ? (
                        <div className="btn-group shadow-sm">
                          <button className="btn btn-sm btn-success" onClick={() => handleSave(book.id)}>Save</button>
                          <button className="btn btn-sm btn-light border" onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div className="btn-group shadow-sm">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => { setEditingId(book.id); setEditFormData({...book}); }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(book.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="card-footer bg-white d-flex justify-content-center py-3">
          <nav>
            <ul className="pagination pagination-sm mb-0 shadow-sm">
              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}