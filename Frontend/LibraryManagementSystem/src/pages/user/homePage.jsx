import BookCard from '../../components/books/BookCard';
import BorrowNowModal from '../../components/modals/BorrowNowModal';
import { useState, useEffect } from 'react'; 
import api from '../../services/Service';
import MyBorrows from './MyBorrows';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {

  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/all');
        setBooks(response.data); 
      }  catch (error) {
         console.error("Error fetching books:", error);
        toast.error("Could not load books from server."); // <--- USE TOAST
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleJoinWaitlist = (book) => {
  toast.info(`Joined waitlist for "${book.title}".`); // Changed alert to toast.info
};

 const openBorrowModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

// src/pages/HomePage.jsx

const handleBorrowConfirm = async (bookId, dueDate) => {
  
    const loanData = {
        bookId: bookId,
        userId: user.id,
        returnDate: dueDate
    };

    try {
        const response = await api.post('/api/loans/confirm', loanData);
        
        // Update local state by changing 'status' to 'Issued'
        const updatedBooks = books.map(b => 
            b.id === bookId ? { ...b, status: "Issued" } : b
        );
        setBooks(updatedBooks);
        
        setIsModalOpen(false);
       toast.success(`Success! ${response.data}`);
    } catch (error) {
        console.error("Loan failed:", error);
       toast.error(error.response?.data || "Failed to process loan.");
    }
};

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title?.toLowerCase().includes(searchLower) ||
      book.authorName?.toLowerCase().includes(searchLower) || 
      (book.isbn && String(book.isbn).includes(searchLower))  
    );
  });

  if (loading) return <div className="text-center mt-5">Loading Library...</div>;

  return (
    <div>
      {/* 1. Hero Section */}
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
      <div className="py-5" style={{ backgroundColor: '#e9ecef' }}>
      
      {/* --- NEW SECTION --- */}
      {!searchTerm && (
        <MyBorrows 
          refreshTrigger={isModalOpen} 
          onReturnSuccess={() => {
              // Re-fetch the main book list to show the book as "Available" again
              const fetchBooks = async () => {
                  const response = await api.get('/all');
                  setBooks(response.data);
              };
              fetchBooks();
          }} 
        />
      )}
    <div className="px-4">
      <div className="row g-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div className="col-md-4" key={book.id}>
              {/* --- CHANGE: Pass onWaitlist here --- */}
              <BookCard 
                book={book} 
                onBorrow={() => openBorrowModal(book)} 
                onWaitlist={handleJoinWaitlist} 
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-4">No books found matching "{searchTerm}"</p>
          </div>
        )}
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