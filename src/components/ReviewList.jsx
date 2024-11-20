import React from "react";

const ReviewList = ({ reviews }) => {
  // Handle the case where no reviews are provided
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available for this product.</p>;
  }

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>
              <strong>Recommend:</strong> {review.recommend ? "Yes" : "No"}
            </p>
            <p>{review.text}</p>
            <p>
              <em>By {review.author?.[0]?.name || "Anonymous"}</em>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
