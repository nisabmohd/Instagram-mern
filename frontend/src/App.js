import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from './pages/Explore'

function App() {
  return (
    <>
      <Navbar />
      <div className="width60">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
