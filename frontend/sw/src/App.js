import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import DataSubmissionPage from './pages/DataSubmissionPage';
import DatasetPage from "./pages/DatasetPage";
import ContributorsPage from './pages/ContributorsPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import LicensePage from './pages/LicensePage';
import Layout from './components/Layout';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import DataSubmissionWrapper from "./components/DataSubmission/DataSubmissionWrapper";
import ContactAndFeedbackPage from "./pages/ContactAndFeedbackPage";
import FeedbackPage from "./pages/FeedbackPage";
import PreviewDatasetPage from "./components/preview/DatasetPreviewPage";
import Moderation from "./components/moderation/Moderation";
import FeedbackListPage from './pages/admin/FeedbackListPage'; // adjust path as needed


import Login from './pages/admin/Login';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/home" element={<Layout><HomePage /></Layout>} />
          <Route path="/dataSubmission" element={<Layout><DataSubmissionPage /></Layout>} />
          <Route path="/dataset" element={<Layout><DatasetPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
          <Route path="/license" element={<Layout><LicensePage /></Layout>} />
          <Route path="/contributors" element={<Layout><ContributorsPage /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
          <Route path="/electrospinningTable" element={<Layout><DataSubmissionWrapper /></Layout>} />
          <Route path="/feedbackPage" element={<Layout><FeedbackPage /></Layout>} />
          <Route path="/previewDatasetPage" element={<Layout><PreviewDatasetPage /></Layout>} />
          <Route path="/moderationPage" element={<Moderation />} />
          <Route path="/contactAndFeedbackPage" element={<Layout><ContactAndFeedbackPage /></Layout>} />
          <Route path="/admin/feedback" element={<FeedbackListPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
