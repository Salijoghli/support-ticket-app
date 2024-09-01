import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-back brn-reverse">
      <FaArrowAltCircleLeft /> Go Back
    </Link>
  );
};
