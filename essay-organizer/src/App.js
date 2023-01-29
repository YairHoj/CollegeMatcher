import "./App.css";
import EssayManager from "./Components/EssayManager";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/essayManager"
            element={
              <>
                <EssayManager />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
