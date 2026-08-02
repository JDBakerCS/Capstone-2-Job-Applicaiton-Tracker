import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ApplicationPage() {
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } = useAuth0();
    const [syncedUser, setSyncedUser] = useState(null);
    const [applications, setApplications] = useState([]);

    const activeUserId = syncedUser ? String(syncedUser.id) : null;
    const activeUserName = syncedUser ? syncedUser.username : "";

    useEffect(() => {
        async function getApplications() {
            if (!activeUserId) {
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/applications`, {
                    params: { userId: activeUserId },
                });

                const sortedApplications = [...response.data].sort((a, b) => b.id - a.id);
                setApplications(sortedApplications);
            } catch (error) {
                console.error(error);
            }
        }

        getApplications();
    }, [activeUserId]);

    useEffect(() => {
        async function syncAuth0User() {
            if (!isAuthenticated || !user) {
                setSyncedUser(null);
                return;
            }

            try {
                const response = await axios.post(`${API_URL}/api/users/sync`, {
                    auth0Sub: user.sub,
                    username: user.email || user.name,
                    email: user.email,
                });

                setSyncedUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        syncAuth0User();
    }, [isAuthenticated, user]);

    if (isLoading) {
        return <p className="details-message">Checking login...</p>;
    }

    if (error) {
        return <p className="details-message">Login error: {error.message}</p>;
    }

    if (!isAuthenticated) {
        return (
            <main className="home-page login-page">
                <section className="login-card">
                    <div>
                        <p className="home-hero__eyebrow">Capstone II</p>
                        <h1>Application Tracker</h1>
                        <h4 className="lead" >
                            Log in to track your jobs, internships, or scholarships.
                        </h4>
                    </div>
                    <button
                        type="button"
                        className="home-create-application-button"
                        onClick={() => loginWithRedirect()}
                    >
                        Log in here
                    </button>
                </section>
            </main>
        );
    }

    if (!activeUserId) {
        return <p className="details-message">Preparing your dashboard... Patience is a virtue.</p>;
    }

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

                <div className="auth-actions">
                    <span>Signed in as {user?.name}</span>
                    <button
                        type="button"
                        className="auth0-login-button"
                        onClick={() =>
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin,
                                },
                            })
                        }
                    >
                        Log out
                    </button>
                </div>

                <aside className="home-hero__total-card" aria-label="Application summary">
                    <p className="total-card__label">Total applications</p>
                    <p className="total-card__value">{applications.length}</p>
                </aside>

                <Link
                    className="home-create-application-button"
                    to={`/applications/new?userId=${activeUserId}&userName=${encodeURIComponent(activeUserName)}`}
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

                {applications.length === 0 ? (
                    <div className="empty-state">
                        <h3>No applications yet</h3>
                        <p>
                            Create your first application to start tracking status, notes, and next steps.
                        </p>
                        <Link
                            className="details-link"
                            to={`/applications/new?userId=${activeUserId}&userName=${encodeURIComponent(activeUserName)}`}
                        >
                            Create application
                        </Link>
                    </div>
                ) : (
                    <ul className="applications-list">
                        {applications.map((application) => (
                            <li key={application.id} className="application-pill">
                                <span>{application.company}</span>
                                <span>{application.role}</span>
                                <span className="status-pill">{application.status}</span>
                                <span>{new Date(application.updatedAt).toLocaleDateString()}</span>
                                <Link
                                    to={`/applications/${application.id}?userId=${activeUserId}&userName=${encodeURIComponent(activeUserName)}`}
                                    className="details-link"
                                >
                                    View details
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default ApplicationPage;
