
import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VideoAnalysis = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    setIsUploading(true);
    try {
      // Generate a unique filename
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase storage with explicit content type
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage error:', error);
        throw new Error('Failed to upload video');
      }

      // Get video URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);
      
      setVideoUrl(publicUrl);

      // Call model prediction endpoint
      const response = await fetch('/api/predict-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: publicUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to get predictions');
      }
      
      const predictionData = await response.json();
      setPredictions(predictionData);
      toast.success('Analysis complete!');

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload video');
      setVideoUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Video Analysis</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="glass p-8 rounded-lg mb-8">
          <div className="text-center">
            <input
              type="file"
              accept="video/*"
              onChange={handleUpload}
              className="hidden"
              id="video-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="video-upload"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white cursor-pointer hover:bg-primary-hover transition-colors ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload size={20} />
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </label>
          </div>

          {videoUrl && (
            <div className="mt-8">
              <video
                src={videoUrl}
                controls
                className="w-full rounded-lg"
                playsInline
              />
            </div>
          )}

          {predictions && (
            <div className="mt-8 p-4 rounded-lg bg-background">
              <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(predictions, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            <span>Supported formats: MP4, WebM, MOV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysis;
