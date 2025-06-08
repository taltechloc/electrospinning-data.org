import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#007bff' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 text-light" to="/home">
            Electrospinning-Data
          </Link>
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/dataSubmission">
                  Submit Data
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/dataset">
                  Dataset
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/contributors">
                  Contributors
                </Link>
              </li>

                <li className="nav-item">
                  <Link className="nav-link text-light" to="/ContactAndFeedbackPage">
                    Contact
                  </Link>
                </li>
              </ul>


            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about">
                  About
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
  );
};

export default Navbar;
