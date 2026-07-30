import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const statusOptions = [
    "Interested",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
    "Withdrawn",
];

const notesPlaceholder = `Deadline (if any): MM/DD/YYYY
Date opened (if relevant): MM/DD/YYYY
Amount / salary info:
Application URL:
Extra notes:`;

function NewApplicationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        status: "",
        notes: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setErrorMessage("");

            await axios.post("http://localhost:3000/api/applications", formData);

            alert("Application created!");

            setFormData({
                company: "",
                role: "",
                status: "",
                notes: "",
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            setErrorMessage("Could not create application.");
        }
    }
    return (
        <main className="details-page">
            <Link to="/" className="back-link">
                Back to applications
            </Link>

            <section className="details-card">
                <p className="details-eyebrow">Create Application</p>
                <h1>New Job Application</h1>
                <p className="details-role">
                    Add a new application to your tracker.
                </p>

                <form className="application-form" onSubmit={handleSubmit}>
                    <label htmlFor="company">Company</label>
                    {errorMessage && <p>{errorMessage}</p>}

                    <input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <label htmlFor="role">Role</label>
                    <input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    />

                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Choose a status</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder={notesPlaceholder}
                        rows="7"
                    />

                    <button type="submit">Create application</button>
                </form>
            </section>
        </main>
    );
}

export default NewApplicationPage;