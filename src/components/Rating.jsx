import { FaStar } from "react-icons/fa";
import { useState } from "react";

const Rating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

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
              onClick={() => {
                props.addRatings({ movie: props.movie, rating: ratingVal });
                setRating(ratingVal);
              }}
            />
            <FaStar
              color={ratingVal <= (hover || rating) ? "gold" : "grey"}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </h1>
  );
};

export default Rating;
