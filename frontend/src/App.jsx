import { Routes, Route } from "react-router-dom";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage"
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationPage/>}/>
      <Route
        path="/applications/:id"
        element={<ApplicationDetailsPage/>}
        />
    </Routes>
  )
}

export default App;