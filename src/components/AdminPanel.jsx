import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminPanel = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", width: "100%" }}>
        <Outlet /> {/* loads child pages: AddBlog or ViewBlogs */}
      </div>
    </div>
  );
};

export default AdminPanel;
