import { useEffect, useState, useCallback } from "react";
import userService from "../services/userService";
import "./EachReview.css";

const EachReview = ({ review }) => {
  const [userName, setUserName] = useState("");

  const getUserName = useCallback(async () => {
    try {
      const userId = review.author._id || review.author;
      console.log("Fetching user data for author ID:", userId); 
      const response = await userService.getUserById(userId);
      console.log("User response:", response); 
      setUserName(response.username || "Anonymous");
    } catch (err) {
      console.error("Error fetching user", err);
      setUserName("Anonymous");
    }
  }, [review.author]); 
  

  useEffect(() => {
    if (review.author) {
      console.log("Review author present:", review.author); 
      getUserName();
    }
  }, [review.author, getUserName]); 

  useEffect(() => {
    console.log("UserName state updated to:", userName);
  }, [userName]); 

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
