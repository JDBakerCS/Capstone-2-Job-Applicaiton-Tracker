import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const temporaryUsers = [
    {
        id: "2",
        username: "maria_dev",
        label: "Maria",
    },
    {
        id: "4",
        username: "james_dev",
        label: "James",
    },
];

function ApplicationPage() {
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } = useAuth0();
    const [syncedUser, setSyncedUser] = useState(null);
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [syncedUser, setSyncedUser] = useState(null)
    const navigate = useNavigate();
    const rawUserId = searchParams.get("userId");
    const rawUserName = searchParams.get("userName");

    const userId = rawUserId && rawUserId !== "null" ? rawUserId : "2";
    const userName =
        rawUserName && rawUserName !== "null" ? rawUserName : "maria_dev";

    const selectedUser =
        temporaryUsers.find((user) => user.id === userId) || temporaryUsers[0];

    const activeUserId = syncedUser ? String(syncedUser.id) : selectedUser.id;
    const activeUserName = syncedUser ? syncedUser.username : selectedUser.username;

    useEffect(() => {
        async function getApplications() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/applications",
                    {
                        params: { userId: activeUserId },
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
    }, [activeUserId]);

    useEffect(() => {
        async function syncAuth0User() {
            if (!isAuthenticated || !user) {
                return;
            }
            try {
                const response = await axios.post("http://localhost:3000/api/users/sync", {
                    auth0Sub: user.sub,
                    username: user.name,
                    email: user.email,
                });

                console.log("synced Auth0 user:", response.data)

                setSyncedUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        syncAuth0User();
    }, [isAuthenticated, user]);

    useEffect(() => {
        async function syncAuth0User() {
            if (!isAuthenticated || !user) {
                return;
            }
            try {
                const response = await axios.post("http://localhost:3000/api/users/sync", {
                    auth0Sub: user.sub,
                    username: user.name,
                    email: user.email,
                });

                setSyncedUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        syncAuth0User();
    }, [isAuthenticated, user]);

    function handleUserChange(event) {
        const nextUser = temporaryUsers.find(
            (user) => user.id === event.target.value
        )
        if (!nextUser) {
            return;
        }
        navigate(`/?userId=${nextUser.id}&userName=${encodeURIComponent(nextUser.username)}`);

    }
    if (isLoading) {
        return <p className="details-message">Checking login...</p>;
    }

    if (error) {
        return <p className="details-message">Login error: {error.message}</p>;
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

                <label className="user-selector">
                    <span>Viewing as</span>
                    <select value={selectedUser.id} onChange={handleUserChange}>
                        {temporaryUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.label}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="auth-actions">
                    {isAuthenticated ? (
                        <>
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
                        </>
                    ) : (
                        <button
                            type="button"
                            className="home-create-application-button"
                            onClick={() => loginWithRedirect()}
                        >
                            Log in
                        </button>
                    )}
                </div>
                <aside className="home-hero__total-card" aria-label="Application summary">
                    <p className="total-card__label">Total applications</p>
                    <p className="total-card__value">{applications.length}</p>
                </aside>
                <Link
                    className="home-create-application-button"
                    to={`/applications/new?userId=${selectedUser.id}&userName=${encodeURIComponent(selectedUser.username)}`}
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
                                to={`/applications/${application.id}?userId=${selectedUser.id}&userName=${encodeURIComponent(selectedUser.username)}`}
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