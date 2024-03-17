import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Support desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/Register">
            <FaSignOutAlt /> Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
