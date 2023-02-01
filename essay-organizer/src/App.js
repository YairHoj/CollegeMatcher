import "./App.css";
import EssayManager from "./Components/EssayManager";
import Menu from "./Components/Menu";
import Nav from "./Components/Nav";
import Heading from "./Components/Heading";
import Features from "./Components/Features";
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
                <CollegeList />
              </>
            }
          />
          <Route
            path="/essaymanager"
            element={
              <>
                <Nav />
                <EssayManager />
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
