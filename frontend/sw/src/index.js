import React from "react";
import ReactDOM from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from "./App";

function ErrorBoundary({ children }) {
    try {
        return children;
    } catch (error) {
        return <h1>Something went wrong.</h1>;
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // Optionally disable StrictMode in production
    process.env.NODE_ENV === 'production' ? (
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    ) : (
        <React.StrictMode>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </React.StrictMode>
    )
);
