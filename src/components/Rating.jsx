import { FaStar } from "react-icons/fa";

const Rating = () => {
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
            <FaStar />
          </label>
        );
      })}
    </h1>
  );
};

export default Rating;
