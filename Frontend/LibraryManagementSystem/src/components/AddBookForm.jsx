// src/components/AddBookForm.jsx
import { useState } from 'react';

export default function AddBookForm({ onAddBook }) {
  // 1. Initial State for the form
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'General',
    image:'',
    description: ''
  });

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the new book object
    const newBook = {
      ...formData,
      id: Date.now(), // Temporary ID for frontend
      isAvailable: true,
      addedDate: new Date().toLocaleDateString()
    };

    // Pass data up to the parent (AdminDashboard)
    if (onAddBook) {
      onAddBook(newBook);
    }

    // Reset form fields
    setFormData({ title: '', author: '', isbn: '', category: 'General',image:'', description: '' });
    alert("Book added successfully!");
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white py-3">
        <h5 className="mb-0">Add New Inventory</h5>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label fw-bold text-secondary">Book Title</label>
            <input 
              type="text" 
              name="title"
              className="form-control" 
              placeholder="e.g. The Art of Computer Programming"
              value={formData.title}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-secondary">Author</label>
            <input 
              type="text" 
              name="author"
              className="form-control" 
              placeholder="e.g. Donald Knuth"
              value={formData.author}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-secondary">Cover Image URL</label>
            <input 
              type="url" 
              name="image"
              className="form-control" 
              placeholder="Paste image link here (https://...)"
              value={formData.image}
              onChange={handleChange}
            />
            <div className="form-text small">Tip: Right-click an image online and select "Copy image address".</div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold text-secondary">ISBN</label>
              <input 
                type="text" 
                name="isbn"
                className="form-control" 
                placeholder="13-digit code"
                value={formData.isbn}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold text-secondary">Category</label>
              <select 
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Fiction">Fiction</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-secondary">Description</label>
            <textarea 
              name="description"
              className="form-control" 
              rows="3" 
              placeholder="Brief summary of the book..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">
            Save to Database
          </button>
        </form>
      </div>
    </div>
  );
}