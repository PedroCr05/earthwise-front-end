import React from "react";
import EachReview from "./EachReview";

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
          <EachReview key={review.id || index} review={review} />
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
