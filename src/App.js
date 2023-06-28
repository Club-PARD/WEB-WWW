import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Home from './pages/Home';
import MypageHome from './pages/MypageHome';
import OtherpageHome from './pages/OtherpageHome';
import ForstVideo from './components/Web/VideoPage/ForstVideo';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import Writing from './pages/Writing';
import Communityall from './pages/Communityall';


// App 요소를 정의
ReactModal.setAppElement('#root')

function App() {
  const [time, setTime] = useState(0);
  const [user, setUser] = useState(null); // Add user state

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home setUser={setUser} setTime={setTime} />}
        />
        <Route path="/Video1" element={<ForstVideo setUser={setUser} time={time} />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        <Route path="/About" element={<About />} />
        <Route
          path="/Mypage"
          element={
            user ? (
              <MypageHome user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* 로그인한 사용자만 접근하도록 하였다 아니면 홈페이지로 렌더링 */}
        <Route path="/Otherpage" element={<OtherpageHome user={user} />} />
        <Route
          path="/Community"
          element={<Communityall user={user} />}
        />
        <Route path="/Writing" element={<Writing user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;



