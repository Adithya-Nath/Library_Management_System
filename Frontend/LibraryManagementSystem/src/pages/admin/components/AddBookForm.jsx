import { useState } from 'react';
import api from '../../../services/Service';
import { toast } from 'react-toastify';

export default function AddBookForm({ onAddBook }) {
  const initialFormState = {
    title: '',
    author: '',
    isbn: '',
    category: 'General',
    image: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      authorName: formData.author,
      isbn: parseInt(formData.isbn),
      imageUrl: formData.image
    };

    try {
      const response = await api.post('/addbook', bookData);
      toast.success("Book added successfully! 📚");
      if (onAddBook) onAddBook();
      setFormData(initialFormState);
    } catch (error) {
      toast.error(error.response?.data || "Failed to save book.");
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white py-3">
        <h5 className="mb-0">Add New Inventory</h5>
      </div>
      <div className="card-body p-4">
        {/* Live Image Preview */}
        {formData.image && (
          <div className="text-center mb-3">
            <img src={formData.image} alt="Preview" className="rounded shadow-sm" style={{ height: '120px' }} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Book Title</label>
            <input type="text" name="title" className="form-control" placeholder="Enter book title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Author</label>
            <input type="text" name="author" className="form-control" placeholder="Enter author name" value={formData.author} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Image URL</label>
            <input type="url" name="image" className="form-control" value={formData.image} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label small fw-bold text-muted">ISBN (10-13 digits)</label>
              <input type="text" name="isbn" className="form-control"  placeholder="Enter ISBN" value={formData.isbn} onChange={handleChange} required maxlength="13" minlength="10" pattern="\d*"  title="Please enter a 10 or 13 digit ISBN"/>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label small fw-bold text-muted">Category</label>
              <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Fiction">Fiction</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Description</label>
            <textarea name="description" className="form-control" placeholder="Enter description" rows="2" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Save Book</button>
        </form>
      </div>
    </div>
  );
}