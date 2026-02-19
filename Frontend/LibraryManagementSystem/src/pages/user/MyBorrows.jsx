import { useState, useEffect } from 'react';
import api from '../../services/Service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext'; 

export default function MyBorrows({ refreshTrigger, onReturnSuccess }) {
  const [myLoans, setMyLoans] = useState([]);
  
  // 1. Use useAuth instead of manual localStorage for better stability
  const { user } = useAuth();

  const fetchMyLoans = async () => {
    try {
      const response = await api.get(`/api/loans/all-issued`);
      
      // 2. FIX: Use loan.userId instead of loan.user.id
      // Also, we use String() to ensure "1" matches 1 (type-safety)
      const activeUserLoans = response.data.filter(
        loan => String(loan.userId) === String(user?.id) && loan.status === 'Active'
      );
      
      setMyLoans(activeUserLoans);
    } catch (error) {
      console.error("Error fetching your loans", error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchMyLoans();
  }, [refreshTrigger, user?.id]);

  const handleReturn = async (loanId, bookTitle) => {
    Swal.fire({
      title: 'Return Book?',
      text: `Are you sure you want to return "${bookTitle}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Yes, return it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post(`/api/loans/return/${loanId}`);
          toast.success("Book returned successfully!");
          fetchMyLoans(); 
          if (onReturnSuccess) onReturnSuccess(); 
        } catch (error) {
          toast.error("Failed to return book.");
        }
      }
    });
  };

  if (myLoans.length === 0) return null;

  return (
    <div className="container-fluid px-5 mb-5">
      <h3 className="fw-bold mb-3 text-secondary">My Current Borrows</h3>
      <div className="row g-3">
        {myLoans.map(loan => {
          const today = new Date();
          const dueDate = new Date(loan.returnDate);
          const isOverdue = today > dueDate;
          
          const diffTime = today - dueDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const lateFee = isOverdue ? diffDays * 10 : 0; 

          return (
            <div className="col-md-6 col-lg-4" key={loan.id}>
              <div className={`card border-0 shadow-sm p-3 d-flex flex-row align-items-center bg-white ${isOverdue ? 'border-start border-danger border-4' : ''}`}>
                <img 
                  // 3. FIX: Use loan.bookImageUrl instead of loan.book.imageUrl
                  src={loan.bookImageUrl || 'https://via.placeholder.com/50x70'} 
                  alt={loan.bookTitle} 
                  style={{width: '50px', height: '70px', objectFit: 'cover'}} 
                  className="rounded me-3"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold text-truncate" style={{maxWidth: '150px'}} title={loan.bookTitle}>
                    {/* 4. FIX: Use loan.bookTitle instead of loan.book.title */}
                    {loan.bookTitle}
                  </h6>
                  
                  <small className={isOverdue ? "text-danger fw-bold" : "text-muted"}>
                    {isOverdue ? `Overdue by ${diffDays} days` : `Due: ${loan.returnDate}`}
                  </small>

                  {isOverdue && (
                    <div className="text-danger small fw-bold mt-1">
                      Fine: ₹{lateFee}
                    </div>
                  )}
                </div>
                <button 
                  className="btn btn-sm btn-outline-danger ms-2" 
                  onClick={() => handleReturn(loan.id, loan.bookTitle)}
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