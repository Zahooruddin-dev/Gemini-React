import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Ensure you import the CSS file

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to="/" className="not-found-link">
        Return to Home
      </Link>
    </div>
  );
}
