import { useState } from 'react';
import AdminStats from './components/AdminStats';
import AddBookForm from './components/AddBookForm';
import BookTable from './components/BookTable';
import IssuedBooksTable from './components/IssuedBooksTable'; // 1. Added Import

export default function AdminDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  
  const handleDataChange = () => {
    setRefreshTrigger(prev => !prev);
  };

  return (
    <div className="container-fluid pb-5 py-5 min-vh-100" style={{ backgroundColor: '#e9ecef' }}>
      <h2 className="mb-4 fw-bold text-dark">Admin Management Console</h2>
      
      {/* 2. Top Section: Statistics Cards */}
      <AdminStats refreshTrigger={refreshTrigger}/>

      {/* 3. Middle Section: Add Form (Left) and Book Inventory (Right) */}
      <div className="row mt-4">
        <div className="col-lg-4">
          <AddBookForm onAddBook={handleDataChange} />        
        </div>
        <div className="col-lg-8">
          <BookTable refreshTrigger={refreshTrigger} onDataChange={handleDataChange}/>
        </div>
      </div>

      {/* 4. Bottom Section: NEW row for Loan Tracking */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-3 h4 fw-bold">Active Loan Tracking</h3>
          {/* Passing refreshTrigger ensures this table updates when books are added/edited */}
          <IssuedBooksTable refreshTrigger={refreshTrigger} />
        </div>
      </div>

    </div>
  );
}