
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import VideoAnalysis from "./pages/VideoAnalysis";
import LiveFeed from "./pages/LiveFeed";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/video-analysis" element={<VideoAnalysis />} />
          <Route path="/projects/live-feed" element={<LiveFeed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <Toaster position="top-right" />
    </div>
  </BrowserRouter>
);

export default App;
