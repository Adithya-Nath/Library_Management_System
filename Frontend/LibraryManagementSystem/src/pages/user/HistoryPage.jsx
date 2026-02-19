import { useState, useEffect } from 'react';
import api from '../../services/Service';
import { useAuth } from '../../context/AuthContext';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/loans/all-issued');
        const userHistory = response.data.filter(
          loan => String(loan.userId) === String(user?.id)
        );
        setHistory(userHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchHistory();
  }, [user?.id]);

  if (loading) return <div className="p-5 text-center">Loading History...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary p-2 rounded me-3 shadow-sm">
            <span className="text-white h4">📜</span>
        </div>
        <h2 className="fw-bold mb-0">Your Reading History</h2>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Book</th>
                <th>Borrowed Date</th>
                <th>Returned Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? history.map((loan) => (
                <tr key={loan.id}>
                  <td className="fw-bold text-primary">{loan.bookTitle}</td>
                  <td>{loan.issueDate}</td>
                  <td>{loan.returnDate || "Not Specified"}</td>
                  <td>
                    <span className={`badge ${loan.status === 'Active' ? 'bg-warning' : 'bg-success'}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center py-4">No history found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}