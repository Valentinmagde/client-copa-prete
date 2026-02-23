import React from "react";
import logo from "../../assets/img/logo1.jpg";
import { Link } from "react-router-dom";

// Define props interface (empty but can be extended)
interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  return (
    <Link
      className="home-link"
      to="/"
      title="Hireco"
      rel="home"
    >
      <img
        id="logo-img"
        height="42"
        width="100"
        className="img-fluid auto_size"
        src={logo}
        alt="logo-img"
      />
    </Link>
  );
};

export default Logo;
