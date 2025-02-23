import React, { useState } from "react";
import QRCode from "qrcode";
import UploadPage from "./HandlePhone";
import { io } from "socket.io-client";
import axios from "axios";

const HandlePhone = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  //   const [uploadedFile, setUploadedFile] = useState(null);
  const baseUrl = "http://192.168.14.63:3000/recycle"; // Link to the upload page

  const generateQrCode = async () => {
    try {
      const url = await QRCode.toDataURL(baseUrl);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR Code", error);
    }
  };

  const disposalTips = {
    paper: {
      class: "Paper",
      tip: "Recycle paper by placing it in designated paper recycling bins. Ensure that it is clean and free from food residue or plastic coatings. Avoid mixing it with food waste or plastic to ensure proper recycling.",
      details:
        "Paper recycling helps reduce deforestation and saves energy. Common items that can be recycled include newspapers, cardboard, and office paper.",
      contact:
        "For more information on paper recycling in your area, contact your local municipal waste management authority or visit [Local Recycling Program Website].",
    },
    plastic: {
      class: "Plastic",
      tip: "Recycle plastics by checking local guidelines for the types of plastic accepted. Separate plastics by type and clean them before disposal. Reduce single-use plastic by opting for reusable alternatives.",
      details:
        "Plastics are recyclable, but they can take hundreds of years to break down in landfills. Items like plastic bottles, containers, and bags can often be recycled. Look for the recycling code on plastic products to identify which can be recycled.",
      contact:
        "For more details on plastic recycling and drop-off locations, contact your local recycling center or visit [Plastic Recycling Organization Website].",
    },
    glass: {
      class: "Glass",
      tip: "Glass can be recycled indefinitely without losing quality. Ensure it is clean and free of any food residue before placing it in the recycling bin. Avoid breaking glass as it can be hazardous.",
      details:
        "Glass is one of the easiest materials to recycle. Common items include glass bottles, jars, and containers. Glass recycling saves energy and reduces the need for raw materials.",
      contact:
        "To find glass recycling centers near you, visit [Glass Recycling Organization Website] or contact your local waste management authority.",
    },
    metal: {
      class: "Metal",
      tip: "Metals like aluminum and steel can be recycled. Clean and separate them from other materials before disposal. Recycling metals conserves natural resources and saves energy.",
      details:
        "Aluminum cans, steel cans, and other metal items can be recycled. Recycling metal helps reduce the need for mining and lowers greenhouse gas emissions.",
      contact:
        "For more information on metal recycling, contact your local recycling center or visit [Metal Recycling Organization Website].",
    },
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Set the selected image file
      setSelectedImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedImage) {
      // Here you would typically upload the image to a server
      // For now, we'll just log the image details
      console.log("Selected Image:", selectedImage);

      // Example of how you might send the image to a server
      const formData = new FormData();
      formData.append("file", selectedImage);
      console.log(selectedImage);
      console.log(formData);

      try {
        const response = await axios.post(
          "http://192.168.14.63:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert(response.data.message);
      } catch (error) {
        console.error("Error uploading file", error);
        alert("Failed to upload the file.");
      }
    }

    // Function to display the results on the page (you can customize this)
    function displayResults(data) {
      const resultContainer = document.getElementById("result-container");
      resultContainer.innerHTML = JSON.stringify(data, null, 2);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-green-100 file:text-green-600
              hover:file:bg-green-300"
            />
            {/* <button
          onClick={generateQrCode}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate QR Code
        </button> */}
            {qrCodeUrl && (
              <div className="flex flex-col items-center mt-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                <p className="text-center mt-2">
                  Scan the QR Code with your phone to upload an image.
                </p>
              </div>
            )}
          </div>

          {previewURL && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={previewURL}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedImage}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md 
            hover:bg-green-700 focus:outline-none focus:ring-2 
            focus:ring-green-600 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Image
          </button>
        </form>
      </div>
    </>
  );
};

export default HandlePhone;
