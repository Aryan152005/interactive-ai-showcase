
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
