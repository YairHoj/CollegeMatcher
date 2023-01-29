import "./App.css";
import Nav from "./Components/Nav";
import CollegeList from "./Components/CollegeList";
import MyColleges from "./Components/MyColleges";
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
          <Route
            path="/my-colleges"
            element={
              <>
                <MyColleges />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
