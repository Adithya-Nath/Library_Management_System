import { useState, useEffect } from 'react';
import api from '../services/Service';
export default function AdminStats({refreshTrigger}) {
  
  const [statsData, setStatsData] = useState({
    totalBooks: 0,
    issuedBooks: 0,
    totalMembers: 0,
    overdueBooks: 0
  });

  
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats');
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);
    // Reload stats whenever a book is added/deleted

  const stats = [
    { label: 'Total Books', value: statsData.totalBooks, color: 'primary', icon: '📚' },
    { label: 'Issued Books', value: statsData.issuedBooks, color: 'warning', icon: '📖' },
    { label: 'Total Members', value: statsData.totalMembers, color: 'success', icon: '👥' },
    { label: 'Overdue', value: statsData.overdueBooks, color: 'danger', icon: '⚠️' },
  ];

  return (
    <div className="row g-3">
      {stats.map((stat, index) => (
        <div className="col-md-3" key={index}>
          <div className={`card border-0 border-start border-${stat.color} border-4 shadow-sm h-100`}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small fw-bold text-uppercase">{stat.label}</div>
                  <div className="h4 mb-0 fw-bold">{stat.value}</div>
                </div>
                <span className="fs-2">{stat.icon}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}