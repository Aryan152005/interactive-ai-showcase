
import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Camera } from "lucide-react";

const Projects = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">AI Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Upload Card */}
        <Link
          to="/projects/video-analysis"
          className="block group"
        >
          <div className="glass p-6 rounded-lg h-full transition-transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Video Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Upload videos and get AI-powered analysis and predictions in real-time.
              Our advanced deep learning model processes your content instantly.
            </p>
            <span className="text-primary group-hover:underline">Learn more →</span>
          </div>
        </Link>

        {/* Live Feed Card */}
        <Link
          to="/projects/live-feed"
          className="block group"
        >
          <div className="glass p-6 rounded-lg h-full transition-transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Live Feed Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Real-time video analysis using your webcam. See AI predictions as they
              happen with our cutting-edge deep learning model.
            </p>
            <span className="text-primary group-hover:underline">Learn more →</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
