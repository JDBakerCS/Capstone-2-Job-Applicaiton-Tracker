// frontend/src/App.jsx
import "./App.css";

function App() {
  const nextSteps = [
    "Lock the User and JobApplication fields",
    "Finish the Sequelize associations",
    "Build the Read All Items slice",
  ];

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Capstone II CRUD App</p>
        <h1>Job Application Tracker</h1>
        <p className="lead">
          Track where you applied, what stage each application is in, and what
          to do next.
        </p>
      </section>

      <section className="panel">
        <h2>Frontend Scaffold</h2>
        <p>
          Once this page loads in the browser, your Vite + React foundation is
          working and we can start the first real vertical slice.
        </p>

        <ul className="next-steps">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;