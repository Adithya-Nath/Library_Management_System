import { useState, useEffect } from 'react';
import api from '../../../services/Service';
import { toast } from 'react-toastify';

export default function IssuedBooksTable({ refreshTrigger }) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchIssuedBooks = async () => {
    try {
      // This now receives the flattened IssuedBookResponseDto list
      const response = await api.get('/api/loans/all-issued');
      setIssuedBooks(response.data);
    } catch (error) {
      console.error("Error fetching issued books:", error);
      toast.error("Failed to load loan records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, [refreshTrigger]);

  const handleAdminReturn = async (loanId) => {
    if (!window.confirm("Confirm this book has been physically returned?")) return;
    try {
      await api.post(`/api/loans/return/${loanId}`);
      toast.success("Book marked as Available.");
      fetchIssuedBooks(); 
    } catch (error) {
      toast.error("Failed to process return.");
    }
  };

  // --- UPDATED SEARCH LOGIC ---
  const filteredLoans = issuedBooks.filter((item) => {
    const search = searchTerm.toLowerCase();
    // Using flat DTO properties: studentName and bookTitle
    return (
      item.studentName?.toLowerCase().includes(search) ||
      item.username?.toLowerCase().includes(search) ||
      item.bookTitle?.toLowerCase().includes(search) ||
      (item.bookId && String(item.bookId).includes(search))
    );
  });

  if (loading) return <div className="text-muted p-3">Loading loan records...</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <h5 className="mb-0 fw-bold">Currently Issued Books</h5>
        <div className="input-group w-50">
          <span className="input-group-text bg-white border-end-0">🔍</span>
          <input 
            type="text" 
            className="form-control border-start-0 shadow-none" 
            placeholder="Search student or book title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Book Details</th>
              <th>Borrowed By</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((item) => {
                const isOverdue = new Date(item.returnDate) < new Date();
                return (
                  <tr key={item.id}>
                    <td>
                      {/* item.bookTitle from DTO */}
                      <div className="fw-bold">{item.bookTitle}</div>
                      <small className="text-muted">ID: {item.bookId}</small>
                    </td>
                    <td>
                      {/* item.studentName from DTO */}
                      <div className="fw-bold text-dark">{item.studentName}</div>
                      <small className="text-secondary">@{item.username}</small>
                    </td>
                    <td>{item.issueDate}</td>
                    <td className={isOverdue && item.status === 'Active' ? "text-danger fw-bold" : ""}>
                      {item.returnDate} {isOverdue && item.status === 'Active' && "⚠️"}
                    </td>
                    <td>
                      <span className={`badge ${item.status === 'Active' ? 'bg-info-subtle text-info border border-info' : 'bg-success-subtle text-success border border-success'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === 'Active' ? (
                        <button 
                          className="btn btn-sm btn-success fw-bold px-3 shadow-sm"
                          onClick={() => handleAdminReturn(item.id)}
                        >
                          Return
                        </button>
                      ) : (
                        <span className="text-muted small italic">Cleared</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">
                  {searchTerm ? `No matches found for "${searchTerm}"` : "No books are currently issued."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}