// AppShell.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppSidebar from "./components/appSideBar/Appsidebar";
import SimpleSnackbar from "../components/SnackBar/SnackBarComponent";
import NotificationsBell from "../components/NotificationsBell/NotificationsBell";

const AppShell = () => (
  <Box
    sx={(t) => ({
      height: "100vh",
      width: "100vw",
      backgroundColor: t.custom.background,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
    })}
  >
    <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
      <NotificationsBell />
    </Box>

    <AppSidebar />

    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        zIndex: 1,
        height: "100%",
      }}
    >
      <Outlet />
    </Box>

    <SimpleSnackbar />
  </Box>
);

export default AppShell;