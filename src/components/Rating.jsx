import { FaStar } from "react-icons/fa";

const Rating = () => {
  return (
    <h1>
      {[...Array(5)].map((star) => {
        return (
          <label>
            {" "}
            <input type="radio" name="rating" />
            <FaStar />
          </label>
        );
      })}
    </h1>
  );
};

export default Rating;
