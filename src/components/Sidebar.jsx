import { Link, Navigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const Navigate = useNavigate();

  return (
    <Stack sx={{
      width: "20rem", bgcolor: '	#000040', height: '83vh', pt: 5, color: 'white', cursor: 'pointer',
      position: 'sticky', left: 0, top: 64, overflowY: 'hidden'
    }}
      alignItems={'center'}
      gap={5}>
      <Typography onClick={() => Navigate("/admin/add-blog")}>Add Blog</Typography>
      <Typography onClick={() => Navigate("/admin/view-blog")}>View Blog</Typography>
    </Stack>
  );
};

export default Sidebar;
