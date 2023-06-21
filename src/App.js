import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
// import MypageHome from './pages/MypageHome';
// import OtherpageHome from './pages/OtherpageHome';
import { useState } from 'react';
import ForstVideo from './components/Web/VideoPage/ForstVideo';

function App() {
  const [theme, setTheme] = useState('');
  const [time, setTime] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setTime={setTime} />} /> {/* Home 컴포넌트로 setTime 함수 전달 */}
        <Route path="/Video1" element={<ForstVideo time={time} />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        <Route path="/About" element={<About />} />
        {/* <Route path="/Mypage" element={<MypageHome />} />
        <Route path="/Otherpage" element={<OtherpageHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

