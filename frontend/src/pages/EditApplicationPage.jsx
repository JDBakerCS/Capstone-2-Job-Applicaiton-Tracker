import { Link, useParams } from "react-router-dom";

function EditApplicationPage() {
  const { id } = useParams();

  return (
    <main className="details-page">
      <Link to={`/applications/${id}`} className="back-link">
        Back to details
      </Link>

      <section className="details-card">
        <p className="details-eyebrow">Edit Application</p>
        <h1>Edit Application {id}</h1>
      </section>
    </main>
  );
}

export default EditApplicationPage;