import { useState, useEffect, useCallback } from 'react';
import api from '../../services/Service';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import MyBorrows from './MyBorrows';
import BookCard from '../../components/books/BookCard';
import BorrowNowModal from '../../components/modals/BorrowNowModal';

export default function HomePage() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  // Search and Modal State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 8;

  // 1. fetchBooks logic - ensure it doesn't reset page unless searchTerm changes
  const fetchBooks = useCallback(async (page = 0, query = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/all?search=${query}&page=${page}&size=${pageSize}`);
      setBooks(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setCurrentPage(response.data.number || 0);
    } catch (error) {
      toast.error("Could not load library data.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchBooks(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchBooks]);

  const handleBorrowConfirm = async (bookId, dueDate) => {
    try {
      await api.post('/api/loans/confirm', {
        bookId,
        userId: user.id,
        returnDate: dueDate
      });
      setIsModalOpen(false);
      setRefreshCount(prev => prev + 1);
      fetchBooks(currentPage, searchTerm);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      toast.error(error.response?.data || "Borrowing failed.");
    }
  };

  // Restoring the Previous Header Style
  return (
    <div className="bg-light min-vh-100">
      <header className="py-5 bg-dark text-white shadow-sm">
        <div className="container-fluid px-5 text-center">
          <h1 className="display-4 fw-bold">Unlock a World of Knowledge</h1>
          <p className="lead mb-4">Search thousands of titles, manage your borrows, and explore new horizons.</p>
          
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Search by book title, author, or ISBN..." 
                  value={searchTerm} 
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0); // Only reset to page 0 when typing
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="py-4">
        {!searchTerm && (
          <MyBorrows 
            refreshTrigger={refreshCount} 
            onReturnSuccess={() => fetchBooks(currentPage, searchTerm)} 
          />
        )}
        
        <div className="container-fluid px-5">
          <div className="row g-4">
            {books.length > 0 ? books.map(book => (
              <div className="col-md-3" key={book.id}>
                <BookCard 
                  book={book} 
                  onBorrow={() => { setSelectedBook(book); setIsModalOpen(true); }} 
                />
              </div>
            )) : !loading && <div className="text-center w-100 py-5 text-muted">No books found.</div>}
          </div>

          {/* Pagination UI - Using Buttons to avoid href refresh issues */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <nav aria-label="Page navigation">
                <ul className="pagination shadow-sm">
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      type="button"
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(i)}
                        type="button"
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                      type="button"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      <BorrowNowModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBorrowConfirm}
      />
    </div>
  );
}