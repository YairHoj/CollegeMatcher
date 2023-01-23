import "./App.css";
import Nav from "./Components/Nav";
import CollegeList from "./Components/CollegeList";
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
            path="/college-list"
            element={
              <>
                <CollegeList />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
