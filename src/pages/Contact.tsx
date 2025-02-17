
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 animate-fade-up">
              Get in <span className="text-primary">Touch</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">contact@ailab.com</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-gray-600 dark:text-gray-400">AI Innovation Hub, Tech City</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 h-32"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
