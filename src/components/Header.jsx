import { AppBar, Toolbar, Box, Button } from "@mui/material";

export const Header = () => {
    return (
        <AppBar sx={{ bgcolor: 'rgba(0, 0, 0, 1)', color: 'white', backdropFilter: 'blur(15px)' }} position="sticky" top="0" left="0">
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', backdropFilter: 'blur(15px)' }}>
                <Box sx={{ backdropFilter: 'blur(15px)' }}>
                    <Button variant="filled">Home</Button>
                    <Button variant="filled">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}