
import { useState, useRef, useEffect } from "react";
import { Camera, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const LiveFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        // Start prediction loop
        predictFrame();
      }
    } catch (error: any) {
      toast.error('Failed to access camera: ' + error.message);
    }
  };

  const stopStream = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setPredictions(null);
    }
  };

  const predictFrame = async () => {
    if (!videoRef.current || !isStreaming) return;

    try {
      // Create canvas and get frame data
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');

      // Send frame to prediction endpoint
      const response = await fetch('/api/predict-frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) throw new Error('Failed to get predictions');
      
      const predictionData = await response.json();
      setPredictions(predictionData);

      // Continue prediction loop
      if (isStreaming) {
        requestAnimationFrame(predictFrame);
      }
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Live Feed Analysis</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="glass p-8 rounded-lg mb-8">
          <div className="text-center mb-8">
            <button
              onClick={isStreaming ? stopStream : startStream}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              <Camera size={20} />
              {isStreaming ? 'Stop Camera' : 'Start Camera'}
            </button>
          </div>

          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg"
            />
            
            {predictions && (
              <div className="mt-4 p-4 rounded-lg bg-background">
                <h3 className="text-xl font-semibold mb-4">Live Predictions</h3>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(predictions, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            <span>Make sure to allow camera access in your browser</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
