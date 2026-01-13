import { Link, Navigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {

  const [select, setSelect] = useState('');

  const Navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setSelect(location.pathname);
  }, [location.pathname]);

  return (
    <Stack sx={{
      width: "20rem", bgcolor: '	#000040', height: '83vh', pt: 5, color: 'white', cursor: 'pointer',
      position: 'sticky', left: 0, top: 64, overflowY: 'hidden'
    }}
      alignItems={'center'}
      gap={5}>
      <Typography onClick={() => Navigate("/admin/add-blog")} sx={{ color: select === "/admin/add-blog" ? 'orange' : 'white' }}>Add Blog</Typography>
      <Typography onClick={() => Navigate("/admin/view-blog")} sx={{ color: select === "/admin/view-blog" ? 'orange' : 'white' }}>View Blog</Typography>
    </Stack>
  );
};

export default Sidebar;
