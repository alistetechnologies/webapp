import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

export function LazyLoadingErrorBoundary() {
  const error = useRouteError();
  const [needsRefresh, setNeedsRefresh] = useState(false);

  // Check for the specific dynamic import failure message upon error change
  useEffect(() => {
    // Check for the specific dynamic import failure, which often indicates a stale chunk/deployment
    if (
      error instanceof TypeError &&
      typeof error.message === "string" &&
      (error.message.includes("Failed to fetch dynamically imported module") ||
        error.message.includes("is not a function"))
    ) {
      console.error(
        "Dynamic module load failed. Potential new deployment/stale chunk detected.",
        error
      );
      setNeedsRefresh(true);
    } else {
      // For other types of errors, you might reset or just not show the refresh prompt
      setNeedsRefresh(false);
    }
  }, [error]);

  const handleRefresh = () => {
    console.log("User initiated page refresh.");
    // Clear the error state if necessary, then force a full page reload
    window.location.reload();
  };

  // If a refresh is needed, show the user a prompt and a button
  if (needsRefresh) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        <h2>Application Update Available!</h2>
        <p>
          It looks like a new version of the application has been deployed while
          you were using it. Please refresh to load the latest changes.
        </p>
        <button
          onClick={handleRefresh}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Refresh Page Now
        </button>
        <p style={{ fontSize: "0.8em", color: "#666" }}>
          Error details: {error.message}
        </p>
      </div>
    );
  }

  // Fallback UI for other unhandled route errors (e.g., a simple 404 or a runtime error in a component)
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>
        An unexpected error occurred. Please try navigating back or contact
        support if the problem persists.
      </p>
      {/* You can show more error details here if appropriate for your users */}
      <pre
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          border: "1px dashed #eee",
          padding: "10px",
        }}
      >
        {error.statusText || error.message || "Unknown error"}
      </pre>
    </div>
  );
}
