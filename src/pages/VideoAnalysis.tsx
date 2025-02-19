
import { useState, useEffect } from "react";
import { Upload, AlertCircle, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AnalysisHistory {
  id: string;
  user_id: string;
  video_name: string;
  video_path: string;
  prediction_results: any;
  created_at: string;
}

const VideoAnalysis = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Please sign in to access this feature");
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('video_analysis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error: any) {
      console.error('Error loading history:', error);
      toast.error('Failed to load analysis history');
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    setIsUploading(true);
    try {
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

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

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);
      
      setVideoUrl(publicUrl);

      const response = await fetch('http://localhost:5000/api/predict-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          videoUrl: publicUrl,
          userId: user.id 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get predictions');
      }
      
      const predictionData = await response.json();
      setPredictions(predictionData);
      toast.success('Analysis complete!');
      
      // Reload history after successful analysis
      await loadHistory();

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload video');
      setVideoUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return null;
  }

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

        {/* Analysis History */}
        <div className="glass p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <History size={24} />
            Analysis History
          </h2>
          
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="p-4 rounded-lg bg-background">
                <h4 className="font-medium mb-2">{item.video_name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analyzed on: {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div className="mt-2">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(item.prediction_results, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
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
