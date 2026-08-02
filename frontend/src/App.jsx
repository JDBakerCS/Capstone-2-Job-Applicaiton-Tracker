import { Routes, Route } from "react-router-dom";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NewApplicationPage from "./pages/NewApplicationPage"
import EditApplicationPage from "./pages/EditApplicationPage";
import trackerBackground from "./assets/tracker-background.png";
import "./App.css";

function App() {
  return (
    <div
      className="app-background"
      style={{ backgroundImage: `url(${trackerBackground})` }}
    >
      <Routes>
        <Route path="/" element={<ApplicationPage />} />
        <Route path="/applications/new" element={<NewApplicationPage />} />
        <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
        <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App;