import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import projectsData from "../assets/projects.json";
import { useNavigate, Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const baseUrl = "http://192.168.14.63:3000/upload";
  const socket = io("http://192.168.14.63:5000"); // Connect to backend WebSocket
  const navigate = useNavigate();

  const generateQrCode = async () => {
    try {
      const url = await QRCode.toDataURL(baseUrl);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR Code", error);
    }
  };

  // Listen for WebSocket events
  useEffect(() => {
    socket.on("fileUploaded", (data) => {
      console.log(data.message); // Log the message
      setSelectedImage(data.filePath); // Save the file path for display
      setPreviewURL(data.filePath);
      console.log(selectedImage);
    });

    // Cleanup on component unmount
    return () => socket.off("fileUploaded");
  }, []);

  const isFilePath = (data) => {
    const filePathPattern = /^(http|https):\/\/.+\/.+\.[a-zA-Z0-9]+$/;
    return filePathPattern.test(data);
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
      const formData = new FormData();

      if (isFilePath(selectedImage)) {
        const response = await fetch(selectedImage);
        const blob = await response.blob(); // Convert the response to a Blob (binary data)
        // Create a FormData object to send the file

        formData.append("file", blob, "image.jpg");
      }
      // Here you would typically upload the image to a server
      // For now, we'll just log the image details
      else {
        console.log("Selected Image:", selectedImage);
        formData.append("file", selectedImage);
      }
      console.log(selectedImage);
      console.log(formData);

      try {
        const response = await fetch("http://127.0.0.1:5000/classify", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to classify the image");
        }

        const data = await response.json();
        const maxClass = Object.keys(data).reduce((maxKey, currentKey) =>
          data[currentKey] > data[maxKey] ? currentKey : maxKey
        );
        setClassificationResult(maxClass);

        fetchFilteredProjects(maxClass);
      } catch (error) {
        setError(error.message);
        setClassificationResult(null);
      }
    }
  };

  const fetchFilteredProjects = async (classification) => {
    if (!classification) {
      alert("Classification result is missing.");
      return;
    }

    try {
      setLoading(true);

      const genAI = new GoogleGenerativeAI(
        "AIzaSyAr31VnbuQywd3FEFNBhXLN4k5Xt2-dB-A"
      ); // Add your Gemini API key here
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log(projectsData);

      const prompt = `
        Based on the classification result "${classification}", identify projects from the following list that align with the disposal type. 
        Only suggest the names of projects related to "${classification}" along with a short description:

        ${projectsData
          .map(
            (project) =>
              `- ${project.name}: ${project.short_description} (Goal: ₹${project.funding_goal}, Received: ₹${project.funding_received})`
          )
          .join("\n")}
      `;

      console.log(prompt);

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      setAiResponse(responseText);
      console.log("RESPONSE : " + aiResponse);

      const suggestedProjects = responseText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      const filtered = projectsData.filter((project) =>
        suggestedProjects.some((suggestion) =>
          suggestion.includes(project.name)
        )
      );

      setFilteredProjects(filtered);
      console.log("FILTERED : " + filteredProjects);
    } catch (error) {
      console.error("Error filtering projects:", error);
      alert("Failed to fetch project suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/project/${id}`); // Navigate to the project detail page with the project ID
  };

  useEffect(() => {
    const calculateFundingPercentage = (projectsData) => {
      return projectsData.map((project) => ({
        ...project,
        funding_received_percentage: Math.min(
          (project.funding_received / project.funding_goal) * 100,
          100
        ),
      }));
    };
  });

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
              className="mt-1 block w-full text-base  text-gray-500 
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-bold
                  file:bg-green-500 file:text-white
                  hover:file:bg-green-600 mb-5"
            />
            <p className="w-full items-center justify-center text-center font-medium mb-5">
              OR
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateQrCode}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 text-base rounded-full "
            >
              Generate QR Code
            </motion.button>
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
            <>
              <p className=" font-medium text-gray-700 mb-2  text-xl">
                Preview:
              </p>
              <div className="flex justify-center">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="max-w-full h-48 object-cover rounded-lg"
                />
              </div>
            </>
          )}

          <button
            onClick={() => setImageUploaded(true)}
            type="submit"
            disabled={!selectedImage}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md 
                hover:bg-green-600 focus:outline-none focus:ring-2 
                focus:ring-green-700 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Image
          </button>
        </form>
      </div>

      {filteredProjects ? (
        // <div>
        //   <h3 className="text-xl font-semibold mt-6">Suggested Projects</h3>
        //   {filteredProjects.length === 0 ? (
        //     <p>No projects found</p>
        //   ) : (
        //     filteredProjects.map((project) => (
        //       <div key={project.id}>
        //         <h4>{project.name}</h4>
        //         <p>{project.short_description}</p>
        //       </div>
        //     ))
        //   )}
        // </div>
        <>
          {/* <div className="p-5">
            Predicted Material : {classificationResult}{" "}
          </div> */}

          <div className="flex justify-center px-4 pb-8 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl w-full">
              {/* Show message if no projects are found */}
              {filteredProjects.length === 0 && imageUploaded ? (
                <div className="flex w-full justify-center items-center mt-10">
                  <motion.div
                    className="h-16 w-16 rounded-full border-t-4 border-green-600 border-opacity-75 animate-spin"
                    style={{
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                    }}
                  ></motion.div>
                  <p className="ml-4 text-lg font-medium text-green-700 animate-pulse">
                    Fetching projects data
                  </p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project.id} className="cursor-pointer">
                    <div
                      onClick={() => handleCardClick(project.id)}
                      className="bg-[#f5fbf4] rounded-2xl p-6 h-[350px] flex flex-col justify-between transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-green-300 border border-[#e0f2e0]"
                    >
                      {/* Location with Icon */}
                      <div className="flex items-center justify-end mb-3">
                        <LocationOnIcon className="text-[#388e3c] mr-2 text-xl" />
                        <span className="text-right text-gray-600 text-sm">
                          {project.location}
                        </span>
                      </div>
                      <h3 className="font-semibold text-center text-2xl text-[#333333] mb-3">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-center mb-3 text-sm">
                        {project.short_description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        imageUploaded && (
          <div className="flex justify-center items-center mt-10">
            <motion.div
              className="h-16 w-16 rounded-full border-t-4 border-green-600 border-opacity-75 animate-spin"
              style={{
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
              }}
            ></motion.div>
            <p className="ml-4 text-lg font-medium text-green-700 animate-pulse">
              Fetching projects data
            </p>
          </div>
        )
      )}
    </>
  );
};

export default ImageUploader;
