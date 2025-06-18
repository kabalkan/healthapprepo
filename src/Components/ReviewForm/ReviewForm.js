import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

const doctors = [
  { name: "Dr. Paul A. Wilkins", specialty: "Dentist" },
  { name: "Dr. John D. Monty", specialty: "Immunology" },
  { name: "Dr. Amy Johnson", specialty: "Dentist" },
  { name: "Dr. Priscilla de Veers", specialty: "Dentist" },
  { name: "Dr. Raj Mahavishnu", specialty: "General Surgery" }
];

const ReviewsPage = () => {

  const [activeFormDoctor, setActiveFormDoctor] = useState(null);
  const [reviewedDoctors, setReviewedDoctors] = useState(() => {
    // Load which doctors have already been reviewed from localStorage (optional)
    return JSON.parse(localStorage.getItem("reviewedDoctors")) || {};
  });
  const [reviewData, setReviewData] = useState({});
  const [formData, setFormData] = useState({
    doctor: doctors[0].name,
    name: '',
    review: '',
    rating: 0,
  });
  const [showWarning, setShowWarning] = useState(false);

  // Load existing reviews
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doctorReviews')) || {};
    setReviewData(data);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const { doctor, name, review, rating } = formData;

  if (!name || !review || rating <= 0) {
    setShowWarning(true);
    return;
  }

  const allReviews = { ...reviewData };
  const newReview = {
    name,
    review,
    rating,
    date: new Date().toISOString()
  };

  allReviews[doctor] = [...(allReviews[doctor] || []), newReview];
  localStorage.setItem('doctorReviews', JSON.stringify(allReviews));

  // ✅ Mark doctor as reviewed
  const updatedReviewedDoctors = { ...reviewedDoctors, [doctor]: true };
  setReviewedDoctors(updatedReviewedDoctors);
  localStorage.setItem("reviewedDoctors", JSON.stringify(updatedReviewedDoctors));

  setReviewData(allReviews);
  setFormData({ doctor: doctors[0].name, name: '', review: '', rating: 0 });
  setShowWarning(false);
  setActiveFormDoctor(null);  // ✅ Hide the form
};

  const getAverageRating = (reviews = []) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rounded ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="review-page">
      <h2>Patient Reviews</h2>
{/* 
      <form onSubmit={handleSubmit} className="review-form">
        <h3>Leave a Review</h3>

        {showWarning && <p className="warning">Please fill out all fields and select a rating.</p>}

        <label>Doctor:</label>
        <select name="doctor" value={formData.doctor} onChange={handleChange}>
          {doctors.map((doc) => (
            <option key={doc.name} value={doc.name}>{doc.name}</option>
          ))}
        </select>

        <label>Your Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Your Review:</label>
        <textarea name="review" value={formData.review} onChange={handleChange}></textarea>

        <label>Your Rating:</label>
        <div className="star-input">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={star <= formData.rating ? 'star filled' : 'star'}
              onClick={() => handleRating(star)}
            >★</span>
          ))}
        </div>

        <button type="submit">Submit Review</button>
      </form> */}

      <table className="review-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Specialty</th>
          <th>Add Review</th> {/* 👈 New column */}
          <th>Latest Review</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doc, index) => {
          const reviews = reviewData[doc.name] || [];
          const latest = reviews[reviews.length - 1]?.review || "No reviews yet";
          const avgRating = getAverageRating(reviews);

          return (
            <React.Fragment key={doc.name}>
              <tr>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.specialty}</td>
                <td>
                  <button
                    onClick={() => setActiveFormDoctor(doc.name)}
                    disabled={reviewedDoctors[doc.name]}
                  >
                    {reviewedDoctors[doc.name] ? "Reviewed" : "Add review"}
                  </button>
                </td>
                <td><em>{latest}</em></td>
                <td>
                  <span className="stars">{renderStars(avgRating)}</span>
                  <span> ({reviews.length})</span>
                </td>
              </tr>

              {/* 👇 Conditionally show form below row */}
              {activeFormDoctor === doc.name && (
                <tr>
                  <td colSpan="6">
                    <form onSubmit={handleSubmit} className="inline-review-form">
                      {showWarning && <p className="warning">Please fill out all fields and select a rating.</p>}
                      <input type="hidden" name="doctor" value={doc.name} />

                      <label>Your Name:</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} />

                      <label>Your Review:</label>
                      <textarea name="review" value={formData.review} onChange={handleChange}></textarea>

                      <label>Your Rating:</label>
                      <div className="star-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            className={star <= formData.rating ? 'star filled' : 'star'}
                            onClick={() => handleRating(star)}
                          >★</span>
                        ))}
                      </div>

                      <button type="submit">Submit</button>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default ReviewsPage;
