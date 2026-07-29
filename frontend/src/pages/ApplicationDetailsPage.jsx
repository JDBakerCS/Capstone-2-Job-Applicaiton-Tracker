import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplicationDetailsPage() {
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getApplication() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/applications/${id}`
                );
                setApplication(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getApplication();
    }, [id]);

    if (loading) { return <p>Patience is a virue...</p> }
    if (!application) {
        return <p>Application not found...
            or patience is still a virue.</p>
    }


    return (
            <main>
                <h1>{application.company}</h1>
                <p>Role: {application.role}</p>
                <p>Status: {application.status}</p>
                <p>Notes: {application.notes}</p>
            </main>
    );
}
export default ApplicationDetailsPage;