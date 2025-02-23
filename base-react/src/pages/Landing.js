import React, { useState } from "react";
import { Box, Typography, Grid, Button, BottomNavigation } from "@mui/material";
import gbw from "../assets/gbw.mp4";
import quiz from "../assets/quiz.mp4";
import Glober from "../components/Glober";
import ChatbotComp from "../pages/Chatbots/ChatbotComp";
import "./Landing.css";

const Landing = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Section 1: Climate Change Info and MP4 Video */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-200 to-purple-200 px-4 py-6 sm:px-6 md:px-8 sm:py-2">
        <Box className="text-left w-full sm:w-3/4 md:w-1/2 px-4">
          <Typography
            variant="h2"
            className="text-violet-800 !font-bold mb-4 pb-6 animate-container text-4xl sm:text-5xl md:!text-7xl"
          >
            Climate Change and Global Warming
          </Typography>
          <Typography
            variant="body1"
            className="text-violet-800 mb-2 text-base sm:!text-lg md:!text-xl font-bold leading-relaxed animate-fadeIn delay-300 pt-2"
          >
            Climate change means long-term changes in the Earth's weather, like
            rising temperatures, more storms, and shifting seasons. It happens
            mostly because of pollution from burning fuels like coal and gas,
            which trap heat in the air. This affects nature, animals, and
            people, but we can help by using clean energy and protecting the
            environment.
          </Typography>
          <button
            className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-violet-800 text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 transition duration-300"
            onClick={() => (window.location.href = "/learning")}
          >
            Learn More
          </button>
        </Box>

        <Box className="w-full sm:w-3/4 md:w-1/2 md:min-h-screen lg:min-h-screen xl:min-h-screen px-4 flex justify-center mt-6 md:mt-0 sm:py-4 md:py-4">
          <div className="w-full text-white flex justify-center  xl:min-h-4/5 lg:min-h-4/5">
            <Glober />
          </div>
        </Box>
      </section>

      {/* Section 2: Animal Chatbot */}
      <section className="py-10 flex flex-col items-center justify-center bg-pink-50">
        <Box className="text-center mb-6">
          <Typography variant="h4" className="text-violet-800 font-bold mb-4">
            Chat with your favorite animal and learn how climate change affects
            them!
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          className="w-full px-6"
        >
          {[
            {
              name: "Polar Bear",
              img: "https://media1.giphy.com/media/rXUYptp9BLmFKnoTw4/giphy.webp",
              endpoint: "/polar-bear",
            },
            {
              name: "Coral Reefs",
              img: "https://media1.giphy.com/media/WmuW6ej3fbtdOcnwAu/giphy.webp",
              endpoint: "/coral-reefs",
            },
            {
              name: "Adélie Penguin",
              img: "https://media2.giphy.com/media/lzeFvieQHIaaXnEC4f/giphy.webp",
              endpoint: "/adelie-penguin",
            },
            {
              name: "Monarch Butterfly",
              img: "https://media1.giphy.com/media/dl2c1a1xHklcJzCmCP/giphy.webp",
              endpoint: "/monarch-butterfly",
            },
            {
              name: "Snow Leopard",
              img: "https://media3.giphy.com/media/2ic7KuIAYcxrQui41z/giphy.webp",
              endpoint: "/snow-leopard",
            },
          ].map((animal, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              key={index}
              className="flex justify-center"
            >
              <Box
                className="rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                sx={{ width: "250px", cursor: "pointer" }}
                onClick={() => (window.location.href = animal.endpoint)}
              >
                <div className="w-full flex items-center justify-center">
                  <img
                    src={animal.img}
                    alt={animal.name}
                    className="w-auto"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>
                <Box className="p-2 text-center">
                  <Typography variant="h6" className="text-gray-800 font-bold">
                    {animal.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Section 3: Quiz Button and MP4 Video */}
      <section className="pt-4 flex items-center justify-center bg-pink-50 pb-16 -mb-8">
        <Box className="flex flex-col md:flex-row items-center justify-between w-full px-6">
          <Box className="text-left w-full md:w-1/2 px-4">
            <Typography
              variant="h4"
              className="text-violet-800 !font-bold !text-4xl mb-6"
            >
              Ready to Test Your Knowledge?
            </Typography>
            <Box className="mt-4 flex space-x-4">
              <button
                variant="contained"
                className="px-6 py-3 bg-violet-800 text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 transition duration-300"
                onClick={() => (window.location.href = "/quiz")}
              >
                Attempt the Quiz
              </button>
              <button
                variant="contained"
                className="px-6 py-3 bg-violet-800 text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 transition duration-300"
                onClick={() => (window.location.href = "/room")}
              >
                Explore room
              </button>
            </Box>
          </Box>
          <Box className="w-3/4 sm:w-2/3 md:w-1/3 px-4 flex justify-center pt-5">
            <video
              src={quiz}
              autoPlay
              loop
              muted
              className="w-full sm:w-3/4 md:w-full max-w-[300px] sm:max-w-[350px] md:max-w-none rounded-lg shadow-lg"
            ></video>
          </Box>
        </Box>
      </section>

      {/* Chatbot Floating Button */}
      <Box
        className="fixed bottom-4 right-4"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "purple",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "darkviolet",
            },
          }}
          onClick={toggleChatbot}
        >
          💬
        </Button>
      </Box>

      {/* Chatbot Component */}
      {isChatbotVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: "80px",
            right: "16px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <ChatbotComp />
        </Box>
      )}
    </div>
  );
};

export default Landing;
