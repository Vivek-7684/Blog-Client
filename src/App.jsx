import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import { GlobalStyles } from '@mui/material';
import Layout from './components/layout/layout.jsx';
import { Routes, Route } from 'react-router-dom';
import AddBlog from './components/AddBlog.jsx';
import ViewBlog from './components/ViewBlog.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import { Blog } from './components/Blog.jsx';

export default function App() {
    return (
        <>
            <GlobalStyles
                styles={{
                    "*": {
                        margin: 0,
                        padding: 0
                    }
                }}
            />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path="/Admin" element={<AdminPanel />}>
                        <Route path="Add-Blog" element={<AddBlog />} />
                        <Route path="View-Blog" element={<ViewBlog />} />
                    </Route>
                    <Route path="/blog" element={<Blog />} />
                </Route>
            </Routes>
        </>
    );
}