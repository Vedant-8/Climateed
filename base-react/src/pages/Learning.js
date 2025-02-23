import React from "react";
import { useNavigate } from "react-router-dom";
import seaLevelImage from "../assets/game1.jpg";
import forestFireImage from "../assets/game2.jpg";
import droughtImage from "../assets/game3.jpg";

const Learning = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Rising Sea Levels",
      image: seaLevelImage,
      description:
        "Understand how climate change leads to rising sea levels and impacts coastal regions.",
      link: "http://localhost:5173/",
    },
    {
      id: 2,
      title: "Forest Fires",
      image: forestFireImage,
      description:
        "Learn how increasing temperatures and human activity contribute to devastating forest fires.",
      link: "http://localhost:5174/",
    },
    {
      id: 3,
      title: "Droughts",
      image: droughtImage,
      description:
        "Explore how changes in weather patterns result in severe droughts worldwide.",
      link: "http://localhost:5175/",
    },
  ];

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  };

  const cardContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
  };

  const cardStyles = {
    flex: "1 1 350px",
    maxWidth: "350px",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  // Adjust styles for larger screens
  const largerScreenCardStyles = {
    maxWidth: "400px",
    minWidth: "350px",
    height: "550px",
  };

  return (
    <div style={containerStyles}>
      {/* Progress Bar */}
      <div
        style={{
          width: "80%",
          height: "10px",
          backgroundColor: "#ddd",
          borderRadius: "5px",
          position: "relative",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        {/* Progress Fill - Hardcoded to increase */}
        <div
          style={{
            width: "25%", // ✅ Change this percentage to increase progress
            height: "100%",
            backgroundColor: "#7C3AED",
            borderRadius: "5px",
            transition: "width 0.3s ease-in-out",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        ></div>

        {/* Progress Dots (Unchanged) */}
        {games.map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "-5px",
              left: `${(index / (games.length - 1)) * 100}%`,
              transform: "translateX(-50%)",
              width: "20px",
              height: "20px",
              backgroundColor: "#7C3AED",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          ></div>
        ))}
      </div>

      <br />
      {/* Cards */}
      <div style={cardContainerStyles}>
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              ...cardStyles,
              ...(window.innerWidth > 1024 && largerScreenCardStyles),
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={game.image}
              alt={game.title}
              style={{
                width: "100%",
                height: "50%",
                borderRadius: "12px 12px 0 0",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                color: "#7C3AED",
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {game.title}
              </h3>
              <p style={{ fontSize: "14px" }}>{game.description}</p>
            </div>
            <button
              onClick={() => (window.location.href = game.link)}
              style={{
                backgroundColor: "#7C3AED",
                color: "#fff",
                padding: "12px 20px",
                border: "none",
                borderRadius: "0 0 12px 12px",
                cursor: "pointer",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Play
            </button>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Learning;
