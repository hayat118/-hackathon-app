import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChallengeDetails from "./Components/ChallengeDetails";
import CreateChallenge from "./Components/CreateChallenge";
import EditPage from "./Components/EditPage";
import ChallengesData from "../src/data/challenges.json";
import { useState, useEffect } from "react";

function App() {
  const [challenge, setChallenge] = useState([]);
  //
  useEffect(() => {
    const storedChallenges = localStorage.getItem("challenge");
    if (storedChallenges) {
      setChallenge(JSON.parse(storedChallenges));
    } else {
      localStorage.setItem("challenge", JSON.stringify(ChallengesData));
      setChallenge(ChallengesData);
    }
  }, []);
  //
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home challenge={challenge} />} />
        <Route
          path="/challenge"
          element={
            <CreateChallenge
              challenge={challenge}
              setChallenge={setChallenge}
            />
          }
        />
        <Route path="/view/:id" element={<ChallengeDetails />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
