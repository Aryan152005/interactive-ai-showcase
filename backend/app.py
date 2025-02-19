
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from prediction import predict_video
import tempfile
import urllib.request

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_ROLE_KEY')
)

@app.route('/api/predict-video', methods=['POST'])
def analyze_video():
    try:
        data = request.json
        video_url = data.get('videoUrl')
        user_id = data.get('userId')

        if not video_url or not user_id:
            return jsonify({'error': 'Missing video URL or user ID'}), 400

        # Download video to temp file
        temp_dir = tempfile.mkdtemp()
        temp_path = os.path.join(temp_dir, 'temp_video.mp4')
        
        urllib.request.urlretrieve(video_url, temp_path)

        # Run prediction
        predictions = predict_video(temp_path)

        # Store results in Supabase
        video_name = video_url.split('/')[-1]
        supabase.table('video_analysis').insert({
            'user_id': user_id,
            'video_path': video_url,
            'video_name': video_name,
            'prediction_results': predictions
        }).execute()

        return jsonify(predictions)

    except Exception as e:
        print(f"Error processing video: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
