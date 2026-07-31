import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const statusOptions = [
    "Interested",
    "Applied",
    'Interviewing',
    'Offer',
    "Rejected",
    "Withdrawn",
];

const notesPlaceholder = `Deadline (if any): MM/DD/YYYY
Date opened (if relevant): MM/DD/YYYY
Amount / salary info:
Application URL:
Extra notes:`;


function EditApplicationPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [originalApplication, setOriginalApplication] = useState(null);
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        status: "",
        notes: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saveMessage, setSaveMessage] = useState("")


    useEffect(() => {
        async function getApplication() {
            try {
                setError("");

                const response = await axios.get(`http://localhost:3000/api/applications/${id}`)

                const application = response.data;

                setOriginalApplication(application);
                setFormData({
                    company: application.company,
                    role: application.role,
                    status: application.status,
                    notes: application.notes || "",
                })
            } catch (error) {
                console.error(error);
                setError("Could not load application")
            } finally {
                setLoading(false);
            }
        }
        getApplication();
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    async function handleSubmit(event) {
        event.preventDefault();

        if (!originalApplication) return;


        const changes = {};
        let hasChanges = false;

        if (formData.company !== originalApplication.company) {
            changes.company = formData.company;
            hasChanges = true;
        }

        if (formData.role !== originalApplication.role) {
            changes.role = formData.role;
            hasChanges = true;
        }

        if (formData.status !== originalApplication.status) {
            changes.status = formData.status;
            hasChanges = true;
        }

        if (formData.notes !== (originalApplication.notes || "")) {
            changes.notes = formData.notes;
            hasChanges = true;
        }

        if (!hasChanges) {
            setSaveMessage("No changes to save.");
            return;
        }
        try {
            setError("");
            setSaveMessage("");

            await axios.patch(`http://localhost:3000/api/applications/${id}`,
                changes
            );

            navigate(`/applications/${id}`);
        } catch (error) {
            console.error(error);
            setError("Could not update application.");
        }
    }
    if (loading) {
        return <p className="details-message">Loading application...</p>;
    }

    if (error && !originalApplication) {
        return (
            <main className="details-page">
                <p className="details-message">{error}</p>
                <Link to={`/applications/${id}`} className="back-link">
                    Back to details
                </Link>
            </main>
        );
    }
    return (
        <main className="details-page">
            <Link to={`/applications/${id}`} className="back-link">
                Back to details
            </Link>

            <section className="details-card">
                <p className="details-eyebrow">Edit Application</p>
                <h1>{formData.company || "Edit Job Application"}</h1>
                <p className="details-role">
                    Update your application information below.
                </p>

                <form className="application-form" onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    {saveMessage && <p>{saveMessage}</p>}

                    <label htmlFor="company">Company</label>
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

                    <button type="submit" className="create-application-button">
                        Save changes
                    </button>
                </form>
            </section>
        </main>
    )



}




export default EditApplicationPage;