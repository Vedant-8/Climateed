import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const ChatbotComp = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatId, setChatId] = useState(null); // To store chat_id
  const [attachedFile, setAttachedFile] = useState(null); // To store the attached file
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    console.log("handleSend triggered", { userInput, attachedFile });

    if (!userInput.trim() && !attachedFile) {
      console.warn("Both input and attached file are empty");
      return;
    }

    // Add the user's message to the chat
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    }

    if (attachedFile) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: `📎 Attached File: ${attachedFile.name}` },
      ]);
    }

    setUserInput("");
    setAttachedFile(null); // Reset attached file

    // Prepare API request body
    const formData = new FormData();
    formData.append("chat_id", chatId || "");
    formData.append("question", userInput.trim());
    if (attachedFile) {
      formData.append("file", attachedFile); // Attach file if present
    }

    console.log("FormData before API call:", Array.from(formData.entries()));

    try {
      // Make the API POST request
      const response = await axios.post(
        "https://558b-115-242-70-50.ngrok-free.app/chat",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("API response:", response.data);

      // Update the chat_id if it's returned
      if (response.data.chat_id) {
        setChatId(response.data.chat_id);
        console.log("Updated chatId:", response.data.chat_id);
      }

      // Add the bot's response to the chat
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.reply || "Response not available." },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong. Please try again." },
      ]);
    }
  };

  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (file) {
      setAttachedFile(file); // Store the file in state
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Enter key pressed");
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "16px",
      }}
    >
      <Typography variant="h6" sx={{ color: "purple", marginBottom: "8px" }}>
        Chatbot
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "8px",
          backgroundColor: "#f3e5f5",
          borderRadius: "8px",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                padding: "8px 12px",
                backgroundColor: message.sender === "user" ? "#d1c4e9" : "#b39ddb",
                borderRadius: "12px",
                color: "black",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              {message.text}
            </Box>
          </Box>
        ))}
        <div ref={chatBoxRef} />
      </Box>

      <Box sx={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
        <IconButton
          component="label"
          sx={{ color: "purple", marginRight: "8px" }}
        >
          <AttachFileIcon />
          <input
            type="file"
            hidden
            onChange={handleAttachFile}
          />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            marginRight: "8px",
            backgroundColor: "#f3edfc",
            borderRadius: "8px",
          }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          sx={{
            backgroundColor: "purple",
            "&:hover": {
              backgroundColor: "darkviolet",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotComp;
