
 export default function BookCard({ book, onBorrow, onWaitlist }) {
  const { 
    title = "Unknown Title", 
    authorName = "Unknown Author", 
    imageUrl, 
    status = "Available", // Get the actual status from the DB
    category = "General" 
  } = book || {};

  // Calculate isAvailable based on the status string
  const isAvailable = status === "Available"; 

  const defaultImage = "https://images.unsplash.com/photo-1543005124-8198f5ac6d7b?auto=format&fit=crop&w=400&q=80";

  // ... rest of the component
  
    const handleAction = () => {
      if (isAvailable) {
        if (onBorrow) onBorrow(book.id);
      } else {
        if (onWaitlist) onWaitlist(book); 
      }
    };

    return (
      <div className="card h-100 shadow-sm border-0 transition-hover">
        <div className="position-relative">
          <img 
            src={imageUrl || defaultImage} 
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
            <p className="text-secondary small mb-3">by {authorName}</p>
          </div>

          <div className="mt-auto">
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