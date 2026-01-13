import Login from './components/Login.js';
import Home from './components/Home.js';
import { GlobalStyles } from '@mui/material';
import Layout from './components/layout/layout.js';
import { Routes, Route } from 'react-router-dom';
import AddBlog from './components/AddBlog.js';
import ViewBlog from './components/ViewBlog.js';
import AdminPanel from './components/AdminPanel.js';
import Blog  from './components/Blog.js';

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