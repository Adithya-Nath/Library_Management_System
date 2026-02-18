import { useState, useEffect } from 'react';
import api from '../services/Service';
import { toast } from 'react-toastify';

export default function MyBorrows({ refreshTrigger, onReturnSuccess }) {
  const [myLoans, setMyLoans] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMyLoans = async () => {
    try {
      const response = await api.get(`/api/loans/all-issued`);
      const activeUserLoans = response.data.filter(
        loan => loan.user.id === user.id && loan.status === 'Active'
      );
      setMyLoans(activeUserLoans);
    } catch (error) {
      console.error("Error fetching your loans", error);
    }
  };

  useEffect(() => {
    if (user) fetchMyLoans();
  }, [refreshTrigger]);

  const handleReturn = async (loanId) => {
    if (!window.confirm("Are you sure you want to return this book?")) return;
    
    try {
      await api.post(`/api/loans/return/${loanId}`);
     toast.success("Book returned successfully!");
      fetchMyLoans(); 
      onReturnSuccess(); 
    } catch (error) {
      toast.error("Failed to return book.");
    }
  };

  if (myLoans.length === 0) return null;

  return (
    <div className="container-fluid px-5 mb-5">
      <h3 className="fw-bold mb-3 text-secondary">My Current Borrows</h3>
      <div className="row g-3">
        {myLoans.map(loan => {
          // --- LATE FEE LOGIC START ---
          const today = new Date();
          const dueDate = new Date(loan.returnDate);
          const isOverdue = today > dueDate;
          
          // Calculate difference in days
          const diffTime = today - dueDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const lateFee = isOverdue ? diffDays * 10 : 0; // ₹10 per day
          // --- LATE FEE LOGIC END ---

          return (
            <div className="col-md-6 col-lg-4" key={loan.id}>
              {/* Added conditional border-start for overdue books */}
              <div className={`card border-0 shadow-sm p-3 d-flex flex-row align-items-center bg-white ${isOverdue ? 'border-start border-danger border-4' : ''}`}>
                <img 
                  src={loan.book.imageUrl || 'https://via.placeholder.com/50x70'} 
                  alt={loan.book.title} 
                  style={{width: '50px', height: '70px', objectFit: 'cover'}} 
                  className="rounded me-3"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold text-truncate" style={{maxWidth: '150px'}} title={loan.book.title}>
                    {loan.book.title}
                  </h6>
                  
                  {/* Conditional text color and message for due date */}
                  <small className={isOverdue ? "text-danger fw-bold" : "text-muted"}>
                    {isOverdue ? `Overdue by ${diffDays} days` : `Due: ${loan.returnDate}`}
                  </small>

                  {/* Display Late Fee if applicable */}
                  {isOverdue && (
                    <div className="text-danger small fw-bold mt-1">
                      Fine: ₹{lateFee}
                    </div>
                  )}
                </div>
                <button 
                  className="btn btn-sm btn-outline-danger ms-2" 
                  onClick={() => handleReturn(loan.id)}
                >
                  Return
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}