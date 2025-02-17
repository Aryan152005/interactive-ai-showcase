
import { ArrowRight, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive visualization of neural network architectures and training processes.",
      image: "gradient-1",
      tags: ["Deep Learning", "Visualization", "React"],
      link: "#"
    },
    {
      title: "Sentiment Analysis API",
      description: "Real-time sentiment analysis using transformer models.",
      image: "gradient-2",
      tags: ["NLP", "API", "Python"],
      link: "#"
    },
    {
      title: "Computer Vision Toolkit",
      description: "A collection of computer vision algorithms and models.",
      image: "gradient-3",
      tags: ["Computer Vision", "OpenCV", "PyTorch"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />
        <div className="container mx-auto px-6 relative">
          <h1 className="text-5xl font-bold mb-12 animate-fade-up">
            Our <span className="text-primary">Projects</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="glass overflow-hidden rounded-2xl hover:scale-105 transition-transform animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`h-48 bg-gradient-to-br from-primary/30 to-purple-500/30`} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    className="text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-2"
                  >
                    View Project <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
