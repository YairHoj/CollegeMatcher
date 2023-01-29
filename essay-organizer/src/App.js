import "./App.css";
import Menu from "./Components/Menu";
import Nav from "./Components/Nav";
import Heading from "./Components/Heading";
import Features from "./Components/Features";
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
                <Menu />
                <div id="page">
                  <Nav />
                  <Heading />
                  <Features />
                </div>
              </>
            }
          />
          <Route
            path="/browse"
            element={
              <>
                <Nav />
              </>
            }
          />
          <Route
            path="/essaymanager"
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
