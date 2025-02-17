
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              AI<span className="text-primary">Lab</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showcasing cutting-edge AI/ML projects and innovations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-primary transition-colors">About</a></li>
              <li><a href="/projects" className="text-sm hover:text-primary transition-colors">Projects</a></li>
              <li><a href="/contact" className="text-sm hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} AILab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
