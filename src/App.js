import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactModal from "react-modal";
import AboutPage from "./pages/AboutPage";
import CommunityAllPage from "./pages/CommunityAllPage";
import HomePage from "./pages/HomePage";
import InquiryPage from "./pages/InquiryPage";
import Mypage from "./pages/Mypage";
import OtherpageHomePage from "./pages/OtherpageHomePage";
import Video from "../src/pages/ForestVideoPage";
import ForstVideo from "./components/Web/Web-VideoPage/Web-ForstVideo";
import Writing from "./pages/WritingPage";

import Usingway from "./pages/Usingway";
// import UserContextPage from './pages/UserContextPage';

// App 요소를 정의
ReactModal.setAppElement("#root");

function App() {
  const [time, setTime] = useState(0);
  const [user, setUser] = useState(null); // Add user state
  // const [theme, setTheme] = useState(0); // Add theme state

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setUser={setUser}
              setTime={setTime}
              // setTheme={setTheme}
              // theme={theme}
            />
          }
        />
        <Route
          path="/Video"
          element={<Video setUser={setUser} user={user} time={time} />}
        />
        <Route path="/Inquiry" element={<InquiryPage />} />
        <Route path="/About" element={<AboutPage setUser={setUser} />} />
        {/* 로그인한 사용자만 접근하도록 하였다 아니면 홈페이지로 렌더링 */}
        <Route path="/Using" element={<Usingway setUser={setUser} />} />
        <Route
          path="/Mypage"
          element={
            user ? (
              <Mypage setUser={setUser} user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/Otherpage"
          element={
            user ? (
              <OtherpageHomePage user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/Community"
          element={
            user ? (
              <CommunityAllPage setUser={setUser} user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/Writing"
          element={
            user ? (
              <Writing setUser={setUser} user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
