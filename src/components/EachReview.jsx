import { useEffect, useState } from "react";
import userService from "../services/userService";

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
    <li>
      <p>
        <strong>Recommend:</strong> {review.recommend ? "Yes" : "No"}
      </p>
      <p>{review.text}</p>
      <p>
        <em>By {userName}</em>
      </p>
    </li>
  );
};

export default EachReview;
