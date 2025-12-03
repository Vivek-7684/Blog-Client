import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
const AdminPanel = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <Box component={'div'} sx={{ px: 5, py: 3, width: "100%", overflowX: 'auto' }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default AdminPanel;
