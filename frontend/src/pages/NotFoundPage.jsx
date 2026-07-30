import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <main className="details-page">
            <Link to="/" className="back-link" >
            Back to applications
            </Link>

            <section className="details-card">
                <p className="details-eyebrow">Error 404</p>
                <h1>Page Not Found</h1>
                <p className="details-role">
                    The page you're looking for doesn't exist...yet
                </p>
            </section>
        </main>
    )
}
export default NotFoundPage;