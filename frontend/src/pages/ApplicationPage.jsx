import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";


function ApplicationPage() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const rawUserId = searchParams.get("userId");
    const rawUserName = searchParams.get("userName");

    const userId = rawUserId && rawUserId !== "null" ? rawUserId : "2";
    const userName =
        rawUserName && rawUserName !== "null" ? rawUserName : "maria_dev";

    useEffect(() => {
        async function getApplications() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/applications",
                    {
                        params: { userId },
                    }
                );

                const sortedApplications = [...response.data].sort((a, b) => b.id - a.id);
                setApplications(sortedApplications);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getApplications();
    }, [userId]);

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
                <Link
                    className="home-create-application-button"
                    to={`/applications/new?userId=${userId}&userName=${encodeURIComponent(userName)}`}
                >
                    Create application
                </Link>

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
                            <Link
                                to={`/applications/${application.id}?userId=${userId}&userName=${encodeURIComponent(userName)}`}
                                className="details-link"
                            >
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