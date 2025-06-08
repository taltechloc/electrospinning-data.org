// DataSubmissionPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/submission/data_submission.css';

const DataSubmissionPage = () => {

  return (
      <div className="container-fluid data-submission-page">
        {/* Header Section */}
        <div className="hero-section text-center">
          <h1 className="hero-heading">Submit Your Data</h1>
          <p className="hero-subheading">
            Help build a valuable dataset for the electrospinning community!
          </p>
        </div>

        {/* Description Section */}
        <div className="form-section text-center">
          <h2 className="form-heading">Contribute to the Open Dataset</h2>
          <p className="form-description">
            By submitting your data, you are contributing to a shared, standardized collection that supports cutting-edge
            research in the field of electrospinning.
          </p>
          <p className="form-description">
            Every dataset, no matter how small, adds value to this growing repository of knowledge.
          </p>
          <p className="form-description">
            Join the movement—your data can help drive innovation and accelerate progress in electrospinning research!
          </p>
        </div>

        {/* Call to Action */}
        <div className="cta-section text-center py-5">
          <h3 className="cta-heading">Ready to Share Your Data?</h3>
          <p className="cta-text">Choose one of the two available methods:</p>

          <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
            <Link to="/electrospinningTable" className="btn btn-lg btn-outline-success">
              Enter Data
            </Link>
            {/*<Link to="/dataUpload" className="btn btn-lg btn-outline-primary">*/}
            {/*  Upload a File*/}
            {/*</Link>*/}
          </div>


        </div>
      </div>
  );
};

export default DataSubmissionPage;
