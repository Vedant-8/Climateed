import React, { useState } from "react";
import { Button, Typography, Box, Paper, LinearProgress } from "@mui/material";
import quizData from "../assets/quiz.json";
import bestVideo from "../assets/best.mp4";
import goodVideo from "../assets/good.mp4";
import tryVideo from "../assets/try.mp4";
import badVideo from "../assets/bad.mp4";
import "./quiz.css";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const questions = quizData;

  const handleOptionClick = (option, index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      selected: index,
      isCorrect: option.is_correct,
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce(
      (total, answer) => (answer?.isCorrect ? total + 1 : total),
      0
    );
  };

  const getScoreFeedback = () => {
    const score = calculateScore();
    const total = questions.length;

    if (score === total) {
      return {
        video: bestVideo,
        comment: "Excellent work! You got everything correct!",
      };
    } else if (score >= total * 0.7) {
      return { video: goodVideo, comment: "Great job! You did really well!" };
    } else if (score >= total * 0.4) {
      return {
        video: tryVideo,
        comment: "Not bad! Keep practicing to improve.",
      };
    } else {
      return {
        video: badVideo,
        comment: "Keep trying! Practice makes perfect.",
      };
    }
  };

  const selectedOption = answers[currentQuestionIndex]?.selected;

  return (
    <div className="quiz-container">
      <Box
        className="background-animation"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f5ff", // Light violet background
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "800px", marginBottom: "16px" }}>
          <LinearProgress
            variant="determinate"
            value={(currentQuestionIndex / (questions.length - 1)) * 100}
            sx={{
              backgroundColor: "#d8b4fe", // Light violet background for progress bar
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#7e22ce", // Darker violet for progress bar indicator
              },
            }}
          />
        </Box>
        {isQuizCompleted ? (
          <Paper
            elevation={3}
            className="flex flex-col justify-center items-center score-board p-4"
            sx={{
              backgroundColor: "rgba(245, 235, 255, 0.85)", // Light violet translucent background
              padding: "24px",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h4" color="#6b21a8" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="h6">
              Your Score: {calculateScore()} / {questions.length}
            </Typography>
            {(() => {
              const feedback = getScoreFeedback();
              return (
                <Box
                  className="flex flex-col justify-center items-center mt-4"
                  sx={{
                    width: "80%",
                    maxWidth: "800px",
                    textAlign: "center",
                  }}
                >
                  <video
                    src={feedback.video}
                    autoPlay
                    loop
                    muted
                    className="rounded-lg shadow-lg"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "500px",
                    }}
                  ></video>
                  <Typography
                    variant="body1"
                    color="#6b21a8"
                    className="score-comment mt-4"
                    sx={{
                      marginTop: "16px",
                      fontSize: "1.2rem",
                      fontWeight: 500,
                    }}
                  >
                    {feedback.comment}
                  </Typography>
                </Box>
              );
            })()}
          </Paper>
        ) : (
          <Paper
            elevation={3}
            className="quiz-box p-4"
            sx={{
              padding: "24px",
              width: "90%",
              maxWidth: "800px",
              backgroundColor: "rgba(245, 240, 255, 0.85)", // Light violet translucent background
              borderRadius: "16px",
              animation: "fadeIn 0.5s",
            }}
          >
            <Typography variant="h5" color="#6b21a8" fontWeight="bold">
              Question {currentQuestionIndex + 1}/{questions.length}
            </Typography>
            <Typography
              variant="h6"
              className="question"
              sx={{ backgroundColor: "transparent" }}
            >
              {questions[currentQuestionIndex].question}
            </Typography>

            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  className={`option-button ${
                    selectedOption !== undefined
                      ? index === selectedOption
                        ? option.is_correct
                          ? "bg-light-green"
                          : "bg-light-red"
                        : option.is_correct
                        ? "bg-light-green"
                        : "bg-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleOptionClick(option, index)}
                  disabled={selectedOption !== undefined}
                  sx={{
                    margin: "8px",
                    width: "100%",
                    borderRadius: "20px",
                    transition: "transform 0.2s",
                    backgroundColor: "#7e22ce", // Violet color for buttons
                    color: "#ffffff", // White text color
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#5e159d", // Darker violet on hover
                    },
                  }}
                >
                  {option.text}
                </Button>
              ))}
            </div>

            {selectedOption !== undefined && (
              <Typography variant="body1" color="#6b21a8" className="reason">
                {questions[currentQuestionIndex].reason}
              </Typography>
            )}

            <Box className="navigation-buttons" sx={{ marginTop: "16px" }}>
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{
                  marginRight: "8px",
                  borderRadius: "20px",
                  color: "#7e22ce",
                  borderColor: "#7e22ce",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#5e159d",
                    color: "#5e159d",
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                onClick={handleNext}
                sx={{
                  borderRadius: "20px",
                  color: "#7e22ce",
                  borderColor: "#7e22ce",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#5e159d",
                    color: "#5e159d",
                  },
                }}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default Quiz;
