import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Nav />
              </>
            }
          />
          <Route
            path="/edit"
            element={
              <>
                <h1>Edit</h1>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
