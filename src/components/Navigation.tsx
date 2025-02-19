
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold">
            Sitnovate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-primary" />
                  <span className="text-sm font-medium">
                    {user.user_metadata.username || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-down">
            <Link
              to="/about"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/projects"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="w-full px-6 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            {user ? (
              <>
                <div className="flex items-center gap-2 px-6 py-2">
                  <User size={20} className="text-primary" />
                  <span className="text-sm font-medium">
                    {user.user_metadata.username || user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
