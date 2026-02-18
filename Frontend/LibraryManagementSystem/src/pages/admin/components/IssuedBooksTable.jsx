import { useState, useEffect } from 'react';
import api from '../../../services/Service';
import { toast } from 'react-toastify';

export default function IssuedBooksTable({ refreshTrigger }) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchIssuedBooks = async () => {
    try {
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
  }, [refreshTrigger]); // Re-fetch when dashboard signals a change

  const handleAdminReturn = async (loanId) => {
    if (!window.confirm("Confirm this book has been physically returned?")) return;
    try {
      await api.post(`/api/loans/return/${loanId}`);
      toast.success("Book marked as Available.");
      fetchIssuedBooks(); // Refresh list
    } catch (error) {
      toast.error("Failed to process return.");
    }
  };

  // --- SEARCH LOGIC ---
  const filteredLoans = issuedBooks.filter((item) => {
    const search = searchTerm.toLowerCase();
    const fullName = `${item.user.firstName} ${item.user.lastName}`.toLowerCase();
    return (
      fullName.includes(search) ||
      item.user.username.toLowerCase().includes(search) ||
      item.book.title.toLowerCase().includes(search) ||
      item.book.isbn.toString().includes(search)
    );
  });

  if (loading) return <div className="text-muted p-3">Loading loan records...</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <h5 className="mb-0 fw-bold">Currently Issued Books</h5>
        {/* Search Bar inside Header */}
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
                      <div className="fw-bold">{item.book.title}</div>
                      <small className="text-muted">ISBN: {item.book.isbn}</small>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{item.user.firstName} {item.user.lastName}</div>
                      <small className="text-secondary">@{item.user.username}</small>
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