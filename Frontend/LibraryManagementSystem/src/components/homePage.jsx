// src/pages/Home.jsx
import { useState } from 'react';
import BookCard from '../components/BookCard';
import BorrowNowModal from './BorrowNowModal';
import { initialBooks } from './mockData';

export default function HomePage() {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- NEW: Waitlist Logic ---
  const handleJoinWaitlist = (book) => {
    // In the future, replace this with an axios call to your backend
    alert(`Success! You have been added to the waitlist for "${book.title}". We will notify you when it is available.`);
    console.log(`User joined waitlist for book ID: ${book.id}`);
  };

  const openBorrowModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

 const handleBorrowConfirm = (bookId, dueDate) => {
    // Logic to update the state
    const updatedBooks = books.map(b => 
      b.id === bookId ? { ...b, isAvailable: false, status: "Issued" } : b
    );
    
    setBooks(updatedBooks);
    setIsModalOpen(false);
  };

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <div className="bg-light p-4 rounded mb-4 shadow-sm">
        <input 
          type="text" 
          className="form-control form-control-lg" 
          placeholder="Search by book title, author, or ISBN..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

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

      <BorrowNowModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBorrowConfirm}
      />
    </div>
  );
}