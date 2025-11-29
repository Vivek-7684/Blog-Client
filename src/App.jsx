import Login from './components/Login.jsx';
import Blog from './components/Blogs.jsx';
import Home from './components/Home.jsx';
import Layout from './components/layout/layout.jsx';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/blogs' element={<Blog />} />
            </Route>
        </Routes>
    );
}