import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, Game } from "./screens/index";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 
