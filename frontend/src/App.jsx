import { Routes, Route } from "react-router-dom";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"
import NewApplicationPage from "./pages/NewApplicationPage"
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationPage />} />
      <Route path="/create" element={<NewApplicationPage />}/>
      <Route path="/applications/:id" element={<ApplicationDetailsPage />}/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;