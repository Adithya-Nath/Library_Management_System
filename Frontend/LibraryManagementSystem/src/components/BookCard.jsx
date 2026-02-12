// src/components/BookCard.jsx

// 1. Added onWaitlist to the props
export default function BookCard({ book, onBorrow, onWaitlist }) {
  const { 
    title = "Unknown Title", 
    author = "Unknown Author", 
    image, 
    isAvailable = true, 
    category = "General" 
  } = book || {};

  const defaultImage = "https://images.unsplash.com/photo-1543005124-8198f5ac6d7b?auto=format&fit=crop&w=400&q=80";

  // 2. New handler function
  const handleAction = () => {
    if (isAvailable) {
      if (onBorrow) onBorrow(book.id);
    } else {
      if (onWaitlist) onWaitlist(book); // Pass the whole book or ID
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 transition-hover">
      <div className="position-relative">
        <img 
          src={image || defaultImage} 
          className="card-img-top" 
          alt={title} 
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <span className={`position-absolute top-0 end-0 m-2 badge ${isAvailable ? 'bg-success' : 'bg-danger'}`}>
          {isAvailable ? 'Available' : 'Not Available'}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>
            {category}
          </small>
          <h5 className="card-title mb-1 text-truncate" title={title}>
            {title}
          </h5>
          <p className="text-secondary small mb-3">by {author}</p>
        </div>

        <div className="mt-auto">
          {/* 3. Removed 'disabled' and updated color/onClick */}
          <button 
            className={`btn w-100 fw-bold ${isAvailable ? 'btn-primary' : 'btn-secondary '}`}
            onClick={handleAction}
          >
            {isAvailable ? 'Borrow Now' : 'Join Waitlist'}
          </button>
        </div>
      </div>
    </div>
  );
}