import EachReview from "./EachReview";
import "./ReviewList.css";

const ReviewList = ({
  reviews,
  onSubmitReview,
  isEditing,
  setIsEditing,
  setEditingReviewId,
  setComment,
  comment,
  recommend,
  setRecommend,
}) => {
  // const [comment, setComment] = useState("");

  // const [editingReviewId, setEditingReviewId] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await onSubmitReview(e, recommend);
    setComment("");
    setRecommend("");
  };

  const handleEdit = (review) => {
    setComment(review.comment);
    setRecommend(review.recommend);
    setEditingReviewId(review._id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setComment("");
    setRecommend("");
    setEditingReviewId(null);
    setIsEditing(false);
  };

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available for this product.</p>;
  }

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>

      <div className="review-form">
        <h3>{isEditing ? "Edit Review" : "Add a Review"}</h3>
        <form onSubmit={handleReviewSubmit}>
          <label htmlFor="recommend">Do you recommend this product?</label>
          <select
            id="recommend"
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button type="submit">
            {isEditing ? "Update Review" : "Submit Review"}
          </button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {reviews && reviews.length > 0 ? (
        <ul className="customer-review-listing">
          {reviews.map((review, index) => (
            <li key={review._id || index} className="review-item">
              <EachReview review={review} />
              <button onClick={() => handleEdit(review)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  );
};

export default ReviewList;