import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import gbw from "../assets/gbw.mp4";
import quiz from "../assets/quiz.mp4";
import "./Landing.css";
// import one from "../assets/1.mp4";
// import two from "../assets/2.mp4";
// import three from "../assets/3.mp4";
// import four from "../assets/4.mp4";
// import five from "../assets/5.mp4";
// import six from "../assets/6.mp4";
// import seven from "../assets/7.mp4";
// import eight from "../assets/8.mp4";
// import nine from "../assets/9.mp4";
// import ten from "../assets/10.mp4";
import polarBear from "../assets/polarBear.jpeg";
import coralReefs from "../assets/coralReefs.jpeg";
import monarch from "../assets/monarch.jpeg";
import penguine from "../assets/penguine.jpeg";
import snowLeopard from "../assets/snowLeopard.jpeg";

const Landing = () => {
  return (
    <div>
      {/* Section 1: Climate Change Info and MP4 Video */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-purple-200">
        <Box className="flex flex-col md:flex-row items-center justify-center w-full px-6">
          <Box className="text-left w-full md:w-1/2 px-4">
            <Typography
              variant="h2"
              className="text-violet-800 !font-bold mb-4 pb-6 animate-container !text-7xl"
            >
              Climate Change and Global Warming
            </Typography>
            <Typography
              variant="body1"
              className="text-violet-800 mb-2 !text-xl font-bold leading-relaxed animate-fadeIn delay-300 pt-2"
            >
              Climate change means long-term changes in the Earth's weather,
              like rising temperatures, more storms, and shifting seasons. It
              happens mostly because of pollution from burning fuels like coal
              and gas, which trap heat in the air. This affects nature, animals,
              and people, but we can help by using clean energy and protecting
              the environment.
            </Typography>

            <button
              className="mt-4 px-6 py-3 bg-violet-800 text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 transition duration-300"
              onClick={() => (window.location.href = "/learning")}
            >
              Learn More
            </button>

            {/* <Typography
              variant="body2"
              className="text-gray-500 mb-1 leading-snug animate-fadeIn delay-600"
            >
              Global warming, a specific type of climate change, describes the
              ongoing rise in Earth's average temperature.
            </Typography> */}
          </Box>

          {/* MP4 Video Content */}
          <Box className="w-full md:w-1/2 px-4 flex justify-center">
            <video
              src={gbw}
              autoPlay
              loop
              muted
              className="rounded-lg shadow-lg"
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover", // Ensures the video fills the frame proportionally
              }}
            ></video>
          </Box>
        </Box>
      </section>

      {/* Section 2: Animal chatbot */}
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
              img: "https://media1.giphy.com/media/rXUYptp9BLmFKnoTw4/giphy.webp?cid=790b7611di9x0qiqcjq1a2zpm3thh7qpw9ocj7fmv24qal9r&ep=v1_stickers_search&rid=giphy.webp&ct=s",
              endpoint: "/polar-bear",
            },
            {
              name: "Coral Reefs",
              img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Vwem5ob2UwbDVmYWNzMHcxOGR4d29obTE4YnY1eGhnbW9sd3pkbyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WmuW6ej3fbtdOcnwAu/giphy.webp",
              endpoint: "/coral-reefs",
            },
            {
              name: "Adélie Penguin",
              img: "https://media2.giphy.com/media/lzeFvieQHIaaXnEC4f/giphy.webp?cid=790b7611scmg53t23euohbis97xwyrzoefw954m7vk9hv78s&ep=v1_stickers_search&rid=giphy.webp&ct=s",
              endpoint: "/adelie-penguin",
            },
            {
              name: "Monarch Butterfly",
              img: "https://media1.giphy.com/media/dl2c1a1xHklcJzCmCP/giphy.webp?cid=790b76112w4z8ojbzjwdlxpr3tik5om7z3mnu5fmykflymbu&ep=v1_stickers_search&rid=giphy.webp&ct=s",
              endpoint: "/monarch-butterfly",
            },
            {
              name: "Snow Leopard",
              img: "https://media3.giphy.com/media/2ic7KuIAYcxrQui41z/giphy.webp?cid=790b7611biu5n5y7qk1sujot0fdjtjzkacf5379f06ovd8cv&ep=v1_stickers_search&rid=giphy.webp&ct=s",
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
                    className="w-auto "
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
          {/* Button */}
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
                className="px-6 py-3 bg-violet-800 text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 transition duration-300 hover:cursor-[url('YOUR_IMAGE_URL'), auto]"
                onClick={() => (window.location.href = "/game")}
              >
                Play Game
              </button>
            </Box>
          </Box>

          {/* MP4 Video */}
          <Box className="w-1/5 md:w-1/3 px-4 flex justify-center">
            <video
              src={quiz}
              autoPlay
              loop
              muted
              className="w-3/4 md:w-full rounded-lg shadow-lg"
            ></video>
          </Box>
        </Box>
      </section>
    </div>
  );
};

export default Landing;
