import { useEffect, useState } from "react";
import userService from "../services/userService";
import "./EachReview.css";

const EachReview = ({ review }) => {
  const [userName, setUserName] = useState("");
  const getUserName = async () => {
    try {
      const response = await userService.getUserById(review.author);

      setUserName(response.username || "Anonymous");
    } catch (err) {
      console.error("Error fetching user", err);
      setUserName("Anonymous");
    }
  };
  useEffect(() => {
    if (review.author) {
      getUserName();
    }
  }, [review.author]);
  return (
    <li className="each-review-comment">
      <div>
        <h3>
          <strong>Recommend:</strong> {review.recommend ? "Yes" : "No"}
        </h3>
        <p className="review-comment">{review.text}</p>
        <p className="commenter-username">
          <em>By {userName}</em>
        </p>
      </div>
    </li>
  );
};

export default EachReview;
