import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Description, Menu, ExitToApp } from "@mui/icons-material";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [{ name: "Home", path: "/home" }];

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    window.location.href = "/login"; // Redirect to login page
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Description sx={{ mr: 1, verticalAlign: "middle" }} />
        Property Wala
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button
              fullWidth
              onClick={() => handleNavigation(item.path)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button fullWidth onClick={handleLogout} sx={{ textAlign: "center" }}>
            <ListItemText primary="Logout" />
            <ExitToApp sx={{ ml: 1 }} />
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Description sx={{ mr: 1, verticalAlign: "middle" }} />
            Property Wala
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<ExitToApp />}
            >
              Logout
            </Button>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
