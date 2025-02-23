from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import from_pretrained_fastai
import pathlib
import torch
from fastai.vision.all import PILImage
import os

temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load the model
learn = from_pretrained_fastai("pyesonekyaw/recycletree_materials")
categories = learn.dls.vocab

# Function to classify the image
def classify_image(img_path):
    img = PILImage.create(img_path)
    pred, idx, outputs = learn.predict(img)
    probs = outputs.as_subclass(torch.Tensor)
    return dict(zip(categories, map(float, probs)))

# Create an endpoint to classify images
@app.route('/classify', methods=['POST'])
def classify():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # If no file is selected
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file to a temporary location
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    try:
        # Classify the image and return the result
        result = classify_image(file_path)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Optionally, remove the file after processing
        os.remove(file_path)

# Run the app
if __name__ == '__main__':
    # Create an uploads folder if it doesn't exist
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True)
