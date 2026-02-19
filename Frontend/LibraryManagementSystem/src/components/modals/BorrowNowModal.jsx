import { useState } from 'react';

export default function BorrowNowModal({ book, isOpen, onClose, onConfirm }) {
  // --- DATE LOGIC START ---
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14);

  // Format to YYYY-MM-DD for the HTML date input
  const minDateStr = today.toISOString().split('T')[0];
  const maxDateStr = twoWeeksLater.toISOString().split('T')[0];
  
  // Default the state to the maximum allowed date (2 weeks)
  const [returnDate, setReturnDate] = useState(maxDateStr);
  // --- DATE LOGIC END ---

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
                src={book.imageUrl || 'https://images.unsplash.com/photo-1543005124-8198f5ac6d7b?w=200'} 
                alt={book.title} 
                className="rounded shadow-sm me-3"
                style={{ width: '80px', height: '110px', objectFit: 'cover' }}
              />
              <div>
                <h6 className="mb-1 fw-bold">{book.title}</h6>
                <p className="text-muted mb-0 small">Author: {book.authorName || book.author}</p>
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
                  min={minDateStr} // Disables past dates
                  max={maxDateStr} // Disables dates beyond 2 weeks
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
                <div className="form-text text-primary small mt-1">
                  * Maximum allowed borrow period is 14 days.
                </div>
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