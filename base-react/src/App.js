import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Learning from "./pages/Learning";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Quiz from "./pages/quiz";
import PolarBearChat from "./pages/Chatbots/PolarBear";
import CoralReefChat from "./pages/Chatbots/CoralReefs";
import AdeliePenguinChat from "./pages/Chatbots/penguin";
import Rewards from "./components/rewards";

import MonarchButterflyChat from "./pages/Chatbots/monarchbutterfly";
import SnowLeopardChat from "./pages/Chatbots/snow_leopard";
import Room from "./pages/Room";
import Recycle from "./pages/Recycle";
import UploadPage from "./pages/HandlePhone";
import ProjectDetail from "./pages/ProjectDetail";

import Blog from "./pages/Blog";
// import Rewards from "./components/rewards";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
      <Footer />
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/polar-bear" element={<PolarBearChat />} />
        <Route path="/coral-reefs" element={<CoralReefChat />} />
        <Route path="/adelie-penguin" element={<AdeliePenguinChat />} />
        <Route path="/monarch-butterfly" element={<MonarchButterflyChat />} />
        <Route path="/snow-leopard" element={<SnowLeopardChat />} />

        <Route path="/learning" element={<Learning />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/learn-play" element={<Learning />} />
        <Route path="/blogs" element={<Blog />} />

        <Route path="/room" element={<Room />} />
        <Route path="/recycle" element={<Recycle />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
};

export default App;
