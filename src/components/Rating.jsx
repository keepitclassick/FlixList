import { FaStar } from "react-icons/fa";
import { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState(null);
  return (
    <h1>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        return (
          <label>
            {" "}
            <input
              type="radio"
              name="rating"
              value={ratingVal}
              onClick={() => setRating(ratingVal)}
            />
            <FaStar color={ratingVal <= rating ? "yellow" : "grey"} />
          </label>
        );
      })}
    </h1>
  );
};

export default Rating;
