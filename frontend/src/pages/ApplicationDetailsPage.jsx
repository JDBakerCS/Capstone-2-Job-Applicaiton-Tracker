import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

function ApplicationDetailsPage() {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function getApplication() {
      try {
        setError("");

        const token = await getAccessTokenSilently();

        const response = await axios.get(`${API_URL}/api/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [id, getAccessTokenSilently]);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this application?");

    if (!confirmed) {
      return;
    }
    try {
      const token = await getAccessTokenSilently();

      await axios.delete(`${API_URL}/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("A moment of silence for an opportunity squandered...")

      navigate("/");
    } catch (error) {
      console.error(error);
      window.alert("Could not delete application.")
    }
  }

  if (loading) {
    return <p className="details-message">Patience is a virtue...</p>;
  }

  if (error) {
    return (
      <main className="details-page">
        <p className="details-message">{error}</p>
        <Link
          to="/"
          className="back-link"
        >
          Back to applications
        </Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link
        to="/"
        className="back-link"
      >
        Back to applications
      </Link>

      <section className="details-card">
        <div className="details-card__top-row">
          <p className="details-eyebrow">Application Details</p>

          <div className="details-card__actions">
            
            <Link className="edit-button"
              to={`/applications/${application.id}/edit`}            >
              <FaPen aria-hidden="true" />
              <span>Edit application</span>
            </Link>
            
            <button type="button" onClick={handleDelete} className="edit-button">
              <FaTrash aria-hidden="true" />
              
              <span>Delete application</span>
            </button>
          </div>
        </div>

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
