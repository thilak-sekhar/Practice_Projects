import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from "./components/Homepage";
import { Predict } from "./components/Predict";
import { Navbar } from "./components/Navbar";
import { Plg } from './components/Plg'; 
import "./styling/App.css";
import background from './assets/background.jpg';


function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }} >
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/plg" element={<Plg />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
