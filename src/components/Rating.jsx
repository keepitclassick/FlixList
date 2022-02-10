import { FaStar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

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

                axios
                  .post("/api/ratings", {
                    movie: props.movie,
                    rating: ratingVal,
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />{" "}
            <div class="star">
              <FaStar
                color={
                  ratingVal <= (hover || rating) ? "DarkGoldenRod" : "grey"
                }
                onMouseEnter={() => setHover(ratingVal)}
                onMouseLeave={() => setHover(null)}
                size={38.5}
              />
            </div>
          </label>
        );
      })}
    </h1>
  );
};

export default Rating;
