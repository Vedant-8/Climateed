import React, { useEffect, useRef, useState } from "react";

function Room() {
  const iframeRef = useRef(null);
  const apiRef = useRef(null); // Store Sketchfab API reference
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false); // Track interaction state

  const [popup, setPopup] = useState(null);

  const regions = [
    {
      id: "Region 1",
      xMin: 10,
      xMax: 180,
      yMin: 340,
      yMax: 560,
      title: "Riding a bike = Saving the planet!",
      text: "Bicycles don’t pollute, save energy, and keep the air clean. Every ride helps fight climate change!",
    },
    {
      id: "Region 2",
      xMin: 248,
      xMax: 290,
      yMin: 160,
      yMax: 208,
      text: "Switch off the light when not needed - save energy, save the planet!",
    },
    {
      id: "Region 3",
      xMin: 503,
      xMax: 533,
      yMin: 210,
      yMax: 250,
      text: "Switch off the light when not needed - save energy, save the planet!",
    },
    {
      id: "Region 4",
      xMin: 1250,
      xMax: 1400,
      yMin: 280,
      yMax: 480,
      text: "Keep the fridge door closed tight - less energy waste means a happier planet!",
    },
    {
      id: "Region 5",
      xMin: 1400,
      xMax: 1480,
      yMin: 370,
      yMax: 490,
      text: "Plants clean our air - let's grow more and help the Earth breathe!",
    },
    {
      id: "Region 6",
      xMin: 850,
      xMax: 1070,
      yMin: 580,
      yMax: 680,
      text: "Plants clean our air - let's grow more and help the Earth breathe!",
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.async = true;
    script.onload = () => {
      if (!window.Sketchfab || !iframeRef.current) return;

      const client = new window.Sketchfab("1.12.1", iframeRef.current);
      client.init("0b5da073be88481091dbef7e55f1d180", {
        success: (api) => {
          api.start();
          console.log("Sketchfab Viewer is ready!");
          apiRef.current = api; // Store API for later use

          api.addEventListener("viewerready", () => {
            api.setUserInteraction(false, (err) => {
              if (!err) {
                console.log("User interaction disabled");
              }
            });
          });

          setTimeout(() => {
            api.getCameraLookAt((err, camera) => {
              if (!err) {
                console.log("📷 Current Eye Position:", camera.position);
                console.log("🎯 Current Target Position:", camera.target);
              } else {
                console.error("❌ Error getting camera position:", err);
              }
            });
            api.setCameraLookAt([0, 0, 0], [10, -10, 0], 2, function (err) {
              if (!err) {
                window.console.log("Camera moved");
              }
            });
          }, 1000);
        },
        error: () => {
          console.error("Sketchfab Viewer failed to load.");
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      setPosition({ x: mouseX + 10, y: mouseY + 10 });

      // Check if mouse is inside any region
      const hoveredRegion = regions.find(
        (region) =>
          mouseX >= region.xMin &&
          mouseX <= region.xMax &&
          mouseY >= region.yMin &&
          mouseY <= region.yMax
      );

      // Update popup text
      setPopup(hoveredRegion ? hoveredRegion.text : null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🔹 Function to toggle interaction
  const toggleInteraction = () => {
    if (!apiRef.current) return;

    apiRef.current.setUserInteraction(!isInteractionEnabled, (err) => {
      if (!err) {
        setIsInteractionEnabled(!isInteractionEnabled);
        console.log(
          `User interaction ${!isInteractionEnabled ? "enabled" : "disabled"}`
        );
      }
    });
  };

  return (
    <div className="w-screen h-screen relative">
      {/* Sketchfab Model */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <iframe
          ref={iframeRef}
          title="Big Room"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/0b5da073be88481091dbef7e55f1d180/embed"
          style={{ pointerEvents: isInteractionEnabled ? "auto" : "none" }} // ✅ Toggle interaction properly
        ></iframe>
      </div>

      {/* Tooltip that follows mouse */}
      {/* {!isInteractionEnabled && (
        <div
          className="fixed bg-gray-900 text-white p-2 rounded shadow-md text-sm pointer-events-none z-10"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          X : {position.x} Y : {position.y}
          <p>Hovering here</p>
        </div>
      )} */}

      {popup && !isInteractionEnabled && (
        <div
          className="fixed bg-green-200 text-black p-2 rounded shadow-md text-sm pointer-events-none z-10 w-48 break-words"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {popup}
        </div>
      )}

      {/* 🔹 Toggle Button */}
      <button
        onClick={toggleInteraction}
        className="absolute top-5 left-5 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-20"
      >
        {isInteractionEnabled ? "Disable Interaction" : "Enable Interaction"}
      </button>
    </div>
  );
}

export default Room;
