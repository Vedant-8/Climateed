import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Navigation handler
  const navigateTo = (endpoint) => {
    window.location.href = endpoint;
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#f9fafb", // Custom light gray color
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar>
          {/* Website Name on the left */}
          <Box>
            <Button
              onClick={() => navigateTo("/")}
              style={{
                color: "#5b21b6", // Violet color
                fontWeight: "800", // Bold text for the website name
                padding: "8px 16px",
                fontSize: "1.25rem", // Slightly larger text for emphasis
                transition: "all 0.3s",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#4c1d95"; // Darker violet on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#5b21b6"; // Reset violet color
              }}
            >
              ClimateEd
            </Button>
          </Box>

          {/* Navigation Buttons or Menu Icon */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on small screens
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            {["Learn-Play", "Recycle", "Blogs", "Rewards"].map((label, index) => (
              <Button
                key={index}
                onClick={() => navigateTo(`/${label.toLowerCase()}`)}
                style={{
                  color: "#7c3aed", // Violet color
                  fontWeight: "700",
                  padding: "8px 16px",
                  marginLeft: "8px", // Spacing between buttons
                  transition: "all 0.3s",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e9d5ff"; // Light violet on hover
                  e.target.style.color = "#5b21b6"; // Dark violet text on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Transparent background
                  e.target.style.color = "#7c3aed"; // Reset violet color
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Menu Icon for Mobile */}
          <Box sx={{ display: { xs: "block", md: "none" }, ml: "auto" }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon style={{ color: "#5b21b6" }} /> {/* Violet menu icon */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: "#f9fafb", // Background matching AppBar
            height: "100%",
          }}
        >
          <List>
            {["Learn-Play", "Challenges", "", "Rewards"].map(
              (label, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => {
                    navigateTo(`/${label.toLowerCase()}`);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemButton>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        style: {
                          color: "#7c3aed", // Violet color
                          fontWeight: "700",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
