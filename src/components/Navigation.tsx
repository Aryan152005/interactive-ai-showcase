
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "py-6"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            AI<span className="text-primary">Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass mt-4 rounded-lg p-4 animate-fade-down">
            <div className="flex flex-col gap-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
