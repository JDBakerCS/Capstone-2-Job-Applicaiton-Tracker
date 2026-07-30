import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ApplicationDetailsPage() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getApplication() {
      try {
        setError("");

        const response = await axios.get(
          `http://localhost:3000/api/applications/${id}`
        );

        setApplication(response.data);
      } catch (error) {
        console.error(error);

        if (error.response?.status === 404) {
          setError("Application not found.");
        } else {
          setError("Something went wrong while loading this application.");
        }
      } finally {
        setLoading(false);
      }
    }

    getApplication();
  }, [id]);

  if (loading) {
    return <p className="details-message">Patience is a virue...</p>;
  }

  if (error) {
    return (
      <main className="details-page">
        <p className="details-message">{error}</p>
        <Link to="/" className="back-link">
          Back to applications
        </Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link to="/" className="back-link">
        Back to applications
      </Link>

      <section className="details-card">
        <p className="details-eyebrow">Application Details</p>

        <h1>{application.company}</h1>
        <p className="details-role">{application.role}</p>

        <div className="details-meta">
          <div className="details-meta-block">
            <span className="details-label">Status</span>
            <span className="status-pill">{application.status}</span>
          </div>

          <div className="details-meta-block">
            <span className="details-label">Last Updated</span>
            <span>{new Date(application.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <section className="notes-card" aria-labelledby="notes-heading">
          <h2 id="notes-heading">Notes</h2>
          <p>{application.notes || "No notes added yet."}</p>
        </section>
      </section>
    </main>
  );
}

export default ApplicationDetailsPage;