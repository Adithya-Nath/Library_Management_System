// src/pages/AdminDashboard.jsx
import AdminStats from '../components/AdminStats';
import AddBookForm from '../components/AddBookForm';
import BookTable from '../components/BookTable';

export default function AdminDashboard() {
    const handleNewBook = (book) => {
  console.log("Saving to system:", book);
  // Here you would typically send this to your Spring Boot API
};
  return (
    <div className="container-fluid pb-5">
      <h2 className="mb-4">Admin Management Console</h2>
      
      {/* Overview Stats */}
      <AdminStats />

      <div className="row mt-4">
        {/* Left Side: Entry Form */}
        <div className="col-lg-4">
        <AddBookForm onAddBook={handleNewBook} />        </div>

        {/* Right Side: Data Table */}
        <div className="col-lg-8">
          <BookTable />
        </div>
      </div>
    </div>
  );
}