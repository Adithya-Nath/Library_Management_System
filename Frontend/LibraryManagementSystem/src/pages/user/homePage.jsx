import { useState, useEffect } from 'react'; 
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/all');
      setBooks(response.data); 
    } catch (error) {
      toast.error("Could not load books.");
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowConfirm = async (bookId, dueDate) => {
    try {
      await api.post('/api/loans/confirm', {
        bookId,
        userId: user.id,
        returnDate: dueDate
      });
      
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: "Issued" } : b));
      setIsModalOpen(false);
      setRefreshCount(prev => prev + 1); // Trigger MyBorrows
      toast.success("Book borrowed successfully!");
    } catch (error) {
      toast.error(error.response?.data || "Borrowing failed.");
    }
  };

  const filteredBooks = books.filter(b => 
    b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.authorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="bg-light min-vh-100">
     <header className="py-5 bg-dark text-white shadow-sm">
        <div className="container-fluid px-5 text-center">
          <h1 className="display-4 fw-bold">Unlock a World of Knowledge</h1>
          <p className="lead mb-4">Search thousands of titles, manage your borrows, and explore new horizons.</p>
          
          {/* Centralized Search Bar */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Search by book title, author, or ISBN..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="py-4">
        {!searchTerm && <MyBorrows refreshTrigger={refreshCount} onReturnSuccess={fetchBooks} />}
        
        <div className="container-fluid px-5">
          <div className="row g-4">
            {filteredBooks.map(book => (
              <div className="col-md-3" key={book.id}>
                <BookCard 
                  book={book} 
                  onBorrow={() => { setSelectedBook(book); setIsModalOpen(true); }} 
                />
              </div>
            ))}
          </div>
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