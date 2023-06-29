import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import AboutPage from './pages/AboutPage';
import CommunityAllPage from './pages/CommunityAllPage';
import HomePage from './pages/HomePage';
import InquiryPage from './pages/InquiryPage';
import Mypage from './pages/Mypage';
import OtherpageHomePage from './pages/OtherpageHomePage';
import WritingPage from './pages/WritingPage';
import ForstVideo from './components/Web/Web-VideoPage/Web-ForstVideo'
// import UserContextPage from './pages/UserContextPage';

// App 요소를 정의
ReactModal.setAppElement('#root')

function App() {
  const [time, setTime] = useState(0);
  const [user, setUser] = useState(null); // Add user state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setUser={setUser} setTime={setTime} />} />
        <Route path="/Video" element={<ForstVideo setUser={setUser} time={time} />} />
        <Route path="/Inquiry" element={<InquiryPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Mypage" element={user ? (<Mypage user={user} />) : (<Navigate to="/" replace />)} />
        {/* 로그인한 사용자만 접근하도록 하였다 아니면 홈페이지로 렌더링 */}
        <Route path="/Otherpage" element={user ? (<OtherpageHomePage user={user} />) : (<Navigate to="/" replace />)} />
        {/* <Route path="/Otherpage" element={<OtherpageHomePage user={user} />} /> */}
        <Route path="/Community" element={user ? (<CommunityAllPage user={user} />) : (<Navigate to="/" replace />)} />
        {/* <Route path="/Community" element={<CommunityAllPage user={user} />} /> */}
        <Route path="/Writing" element={user ? (<WritingPage user={user} />) : (<Navigate to="/" replace />)} />
        {/* <Route path="/Writing" element={<WritingPage user={user} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;