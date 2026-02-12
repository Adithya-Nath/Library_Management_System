// src/components/AdminStats.jsx
export default function AdminStats() {
  const stats = [
    { label: 'Total Books', value: '1,240', color: 'primary', icon: '📚' },
    { label: 'Issued Books', value: '450', color: 'warning', icon: '📖' },
    { label: 'Total Members', value: '890', color: 'success', icon: '👥' },
    { label: 'Overdue', value: '12', color: 'danger', icon: '⚠️' },
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