import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';


const HomePage = () => {
  return (
        <div className="container-fluid position-relative bg-light">
      {/* Hero Section */}
      <div className="hero-section text-center pt-5 pb-5">
        <img
          src="/assets/images/electrospinning.jpg"
          alt="Logo"
          className="logo img-fluid rounded-img" // Apply custom class for rounded corners
        />
        <h1 className="mt-3 display-4 hero-heading">Welcome to the Electrospinning Dataset Hub!</h1>
        <p className="lead mt-3 hero-subheading">A community-driven platform for collecting and sharing electrospinning data.</p>
      </div>

      {/* AboutPage Section */}
      <div className="about-section text-center py-5">
        <h2 className="section-heading">About This Project</h2>
        <p className="mt-3 about-text">
          This crowdsourcing platform aims to collect standardized datasets for electrospinning research. The goal is to create a comprehensive and reliable collection of data that researchers, scientists, and enthusiasts can freely contribute to and benefit from.
        </p>
        <p className="about-text">
          By participating, you can help build an open-source resource that accelerates progress in the field and fosters collaboration across research domains.
        </p>
      </div>

      {/* Features Section */}
      <div className="features-section bg-gradient text-black text-center py-5">
        <h3 className="section-heading">Key Features</h3>
        <div className="row mt-4">
          <div className="col-md-4 feature-box">
            <h4>Open Access</h4>
            <p>Anyone can download, use, and contribute to the dataset without any restrictions.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h4>Community-driven</h4>
            <p>Collaborate with researchers and share valuable data to help improve the field of electrospinning.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h4>Standardized Dataset</h4>
            <p>All data collected will follow a standard format to ensure consistency and usability.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section text-center py-5">
        <h3 className="cta-heading">Ready to Contribute?</h3>
        <p className="cta-text mt-3">Join the community, share your data, and help advance research in electrospinning. Together, we can make a difference!</p>
        <Link to="/dataSubmission" className="btn btn-primary btn-lg mt-3 cta-btn">Start Contributing</Link>
      </div>

    </div>
  );
};

export default HomePage;
