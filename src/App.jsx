import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Events from "./pages/Events.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
