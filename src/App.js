//App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import MypageHome from './pages/MypageHome';
import OtherpageHome from './pages/OtherpageHome';
import ForstVideo from './components/Web/VideoPage/ForstVideo';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import Community from './pages/Community';
function App() {

  const [time, setTime] = useState(0);
  const [user, setUser] = useState(null); // Add user state

  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home setUser={setUser}
          setTime={setTime} />} />
          <Route path="/Video1" element={<ForstVideo time={time} />} />
          <Route path="/Inquiry" element={<Inquiry />} />
          <Route path="/About" element={<About />} />
          <Route path="/Mypage" element={<MypageHome user={user}/>} />
          <Route path="/Otherpage" element={<OtherpageHome  user={user} />} />
          <Route path="/Community" element={<Community user={user} />} />
        </Routes>
      
    </Router>
  );
}

export default App;


