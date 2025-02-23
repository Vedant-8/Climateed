import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  Card,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import projectsData from "../assets/projects.json";
import coin from "../assets/1.png";
import tick from "../assets/2.png"; 

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((project) => project.id === id);
  const [openModal, setOpenModal] = useState(false);
  const [openOtherModal, setOpenOtherModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationDescription, setDonationDescription] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showCoinCard, setShowCoinCard] = useState(false);
  const [showTickCard, setShowTickCard] = useState(false);

  if (!project) {
    return <Typography variant="h4">Project not found</Typography>;
  }

  const handleDonateClick = () => {
    setOpenModal(true);
  };

  const handleOtherDonateClick = () => {
    setOpenOtherModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseOtherModal = () => {
    setOpenOtherModal(false);
  };

  const handleDonateSubmit = () => {
    if (donationAmount && !isNaN(donationAmount) && donationAmount > 0) {
      setOpenModal(false);
      setShowCoinCard(true);
      setDonationAmount(""); // Reset donation amount
      setTimeout(() => {
        setShowCoinCard(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }, 3000);
    }
  };

  const handleOtherDonateSubmit = () => {
    if (donationDescription.trim()) {
      setOpenOtherModal(false);
      setShowTickCard(true);
      setDonationDescription(""); // Reset description
      setTimeout(() => {
        setShowTickCard(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }, 3000);
    }
  };

  const chartData = [
    { month: "Jan", impact: 200 },
    { month: "Feb", impact: 110 },
    { month: "Mar", impact: 170 },
    { month: "Apr", impact: 40 },
    { month: "May", impact: 60 },
    { month: "Jun", impact: 90 },
    { month: "Jul", impact: 100 },
    { month: "Aug", impact: 185 },
    { month: "Sep", impact: 140 },
    { month: "Oct", impact: 130 },
    { month: "Nov", impact: 150 },
    { month: "Dec", impact: 160 },
  ];

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Section 1: Project Name and Description */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "green", fontWeight: "bold", mb: 2 }}
                >
                  {project.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ mb: 2, color: "#757575", fontSize: "1.3rem" }}
                >
                  <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                    {project.description.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "#fff",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#388e3c" },
                    }}
                    onClick={handleDonateClick}
                  >
                    Money Donation
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "#fff",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#388e3c" },
                    }}
                    onClick={handleOtherDonateClick}
                  >
                    Other Donation
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Remaining sections as is... */}
          

        

      {/* Section 2: Funding Goals, Received, and Graph */}
      <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#e8f5e9",
                      color: "green",
                      borderRadius: "20px",
                      px: 2,
                      "&:hover": { backgroundColor: "#c8e6c9" },
                    }}
                  >
                    Funding Goal: ₹ {project.funding_goal}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#e8f5e9",
                      color: "green",
                      borderRadius: "20px",
                      px: 2,
                      "&:hover": { backgroundColor: "#c8e6c9" },
                    }}
                  >
                    Funding Received: ₹ {project.funding_received}
                  </Button>
                </Box>

                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", mb: 2, color: "green" }}
                >
                  Project Impact
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="impact"
                      stroke="green"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 3: Social Media Buttons and Video Link */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<XIcon />}
                    sx={{
                      backgroundColor: "#1DA1F2",
                      color: "#fff",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#0d8ae6" },
                    }}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    sx={{
                      backgroundColor: "red",
                      color: "#fff",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#cc0000" },
                    }}
                  >
                    YouTube Video
                  </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <iframe
                    title="YouTube Video"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/HPJKxAhLw5I"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  ></iframe>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 4: Updates */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: "green", mb: 2 }}>
                  Updates
                </Typography>
                <List>
                  {project.updates.map((update, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        backgroundColor: "#e8f5e9",
                        mb: 2,
                        borderRadius: "10px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "green", mb: 1 }}
                      >
                        {update.date}
                      </Typography>
                      <Typography>{update.description}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
      </Box>
          

      {/* Donation Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 4,
            width: "300px",
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Enter Donation Amount
          </Typography>
          <TextField
            fullWidth
            label="Amount (₹)"
            variant="outlined"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
              sx={{ width: "45%" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDonateSubmit}
              sx={{ width: "45%" }}
            >
              Pay
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Other Donation Modal */}
      <Modal open={openOtherModal} onClose={handleCloseOtherModal}>
        <Box
          sx={{
            padding: 4,
            width: "300px",
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Describe Your Donation
          </Typography>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={donationDescription}
            onChange={(e) => setDonationDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseOtherModal}
              sx={{ width: "45%" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOtherDonateSubmit}
              sx={{ width: "45%" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Coin Card */}
      {showCoinCard && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: 4,
            boxShadow: 3,
            zIndex: 1300,
          }}
        >
          <img
            src={coin}
            alt="Coin"
            style={{ width: "150px", height: "150px", marginBottom: "16px" }}
          />
          <Typography variant="h6" sx={{ color: "green" }}>
            Thank you for your generous donation!
          </Typography>
        </Box>
      )}

      {/* Tick Card */}
      {showTickCard && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: 4,
            boxShadow: 3,
            zIndex: 1300,
          }}
        >
          <img
            src={tick}
            alt="Tick"
            style={{ width: "150px", height: "150px", marginBottom: "16px" }}
          />
          <Typography variant="h6" sx={{ color: "green" }}>
            Thank you for your generous donation, we will connect you soon!
          </Typography>
        </Box>
      )}

      {/* Success Notification */}
      {showNotification && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Thank you for donating!</Typography>
        </Box>
      )}
    </>
  );
};

export default ProjectDetail;
