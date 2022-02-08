import { FaStar } from "react-icons/fa";

const Rating = () => {
  return (
    <h1>
      {[...Array(5)].map((star) => {
        return <FaStar />;
      })}
    </h1>
  );
};

export default Rating;
