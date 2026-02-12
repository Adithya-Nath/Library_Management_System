// src/components/BorrowNowModal.jsx
import { useState } from 'react';

export default function BorrowNowModal({ book, isOpen, onClose, onConfirm }) {
  // 1. Set a default return date (e.g., 14 days from today)
  const defaultReturnDate = new Date();
  defaultReturnDate.setDate(defaultReturnDate.getDate() + 14);
  
  const [returnDate, setReturnDate] = useState(defaultReturnDate.toISOString().split('T')[0]);

  if (!isOpen || !book) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Confirm Borrowing</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="d-flex align-items-center mb-4">
              <img 
                src={book.image || 'https://via.placeholder.com/100x150'} 
                alt={book.title} 
                className="rounded shadow-sm me-3"
                style={{ width: '80px', height: '110px', objectFit: 'cover' }}
              />
              <div>
                <h6 className="mb-1 fw-bold">{book.title}</h6>
                <p className="text-muted mb-0 small">Author: {book.author}</p>
                <p className="text-muted mb-0 small">ISBN: {book.isbn}</p>
              </div>
            </div>

            <form>
              <div className="mb-3">
                <label className="form-label fw-bold">Expected Return Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <div className="form-text">Standard loan period is 14 days.</div>
              </div>

              <div className="alert alert-info py-2 small mb-0">
                ℹ️ By clicking confirm, you agree to the library's late fee policy.
              </div>
            </form>
          </div>

          <div className="modal-footer border-top-0">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button 
              type="button" 
              className="btn btn-primary px-4"
              onClick={() => onConfirm(book.id, returnDate)}
            >
              Confirm Loan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}