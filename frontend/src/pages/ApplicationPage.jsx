import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function ApplicationPage() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function getApplications() {
            try {
                const response = await axios.get("http://localhost:3000/api/applications");

                const sortEarliestFirstApplications =
                    [...response.data].sort((a, b) => b.id - a.id);

                setApplications(sortEarliestFirstApplications);
            } catch (error) {
                console.error(error);
            }
        }
        getApplications();
    }, []);

    return (
        <main className="home-page">
            <section className="home-page-hero">
                <div>

                    <p className="home-hero__eyebrow">Capstone II</p>
                    <h1>Job Application Tracker</h1>
                    <p className="lead">
                        Track where you applied, what stage each application is in, and what
                        to do next.
                    </p>
                </div>
                <aside className="home-hero__total-card" aria-label="Application summary">
                    <p className="total-card__label">Total applications</p>
                    <p className="total-card__value">{applications.length}</p>
                </aside>

            </section>

            <section className="applications-dashboard" aria-labelledby="applications-heading">
                <h2 id="applications-heading">List of Job Applications</h2>

                <div className="applications-legend" aria-hidden="true">
                    <span>Company</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Updated</span>
                    <span>Details</span>
                </div>

                <ul className="applications-list">
                    {applications.map((application) => (
                        <li key={application.id} className="application-pill">
                            <span>{application.company}</span>
                            <span>{application.role}</span>
                            <span className="status-pill">{application.status}</span>
                            <span>{new Date(application.updatedAt).toLocaleDateString()}</span>
                            <Link to={`/applications/${application.id}`} className="details-link">
                                View details
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default ApplicationPage;