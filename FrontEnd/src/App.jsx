import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Components/FrontEnd/Home';
import Service from './Components/FrontEnd/Service';
import Project from './Components/FrontEnd/Project';
import Blog from './Components/FrontEnd/Blog';
import Contact from './Components/FrontEnd/Contact';
import Login from './Components/Backend/Login';
import Dashboard from './Components/Backend/Dashboard';
import RequireAuth from './Components/Common/RequireAuth';


import ServiceDetails from './Components/FrontEnd/ServiceDetails';

import AdminService from './Components/Backend/Services/AdminService';
import CreateService from './Components/Backend/Services/CreateService';
import EditService from './Components/Backend/Services/EditService';
import ShowService from './Components/Backend/Services/ShowService';
import AllProjects from './Components/Backend/projects/AllProjects';
import CreateProject from './Components/Backend/projects/CreateProject';
import EditProjec from './Components/Backend/projects/EditProjec';
import ShowProjects from './Components/Backend/projects/ShowProjects';
import ProjectDetails from './Components/FrontEnd/ProjectDetails';
import AllBlogs from './Components/Backend/Blogs/AllBlogs';
import CreateBlog from './Components/Backend/Blogs/CreateBlog';
import EditBlog from './Components/Backend/Blogs/EditBlog';
import ShowBlog from './Components/Backend/Blogs/ShowBlog';
import BlogDetails from './Components/FrontEnd/BlogDetails';
import AllBanner from './Components/Backend/Banner/AllBanner';
import AllWhy from './Components/Backend/Why/AllWhy';
import CreateWhy from './Components/Backend/Why/CreateWhy';
import EditWhy from './Components/Backend/Why/EditWhy';
import ShowWhy from './Components/Backend/Why/ShowWhy';
import AllTesti from './Components/Backend/Testi/AllTesti';
import CreateTesti from './Components/Backend/Testi/CreateTesti';
import EditTesti from './Components/Backend/Testi/EditTesti';
import ShowTesti from './Components/Backend/Testi/ShowTesti';



function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/project" element={<Project />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />

            <Route path="/service/details/:id" element={<ServiceDetails />} />
            <Route path="/project/details/:id" element={<ProjectDetails />} />
            <Route path="/blog/details/:id" element={<BlogDetails />} />
            {/* FrontEnd Route End  */}

            <Route path="/admin/dashboard" element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            } />

            <Route path="/admin/service" element={
                <RequireAuth>
                    <AdminService />
                </RequireAuth>
            } />

            <Route path="/admin/service/create" element={
                <RequireAuth>
                    <CreateService />
                </RequireAuth>
            } />

            <Route path="/admin/service/edit/:id" element={
                <RequireAuth>
                    <EditService />
                </RequireAuth>
            } />

            <Route path="/admin/service/show/:id" element={
                <RequireAuth>
                    <ShowService />
                </RequireAuth>
            } />

            {/* Service  Route End  */}

            <Route path="/admin/projects" element={
                <RequireAuth>
                    <AllProjects />
                </RequireAuth>
            } />

            <Route path="/admin/projects/create" element={
                <RequireAuth>
                    <CreateProject />
                </RequireAuth>
            } />

            <Route path="/admin/projects/edit/:id" element={
                <RequireAuth>
                    <EditProjec />
                </RequireAuth>
            } />

            <Route path="/admin/projects/show/:id" element={
                <RequireAuth>
                    <ShowProjects />
                </RequireAuth>
            } />

            {/* Projects  Route End  */}

            <Route path="/admin/blogs" element={
                <RequireAuth>
                    <AllBlogs />
                </RequireAuth>
            } />

            <Route path="/admin/blogs/create" element={
                <RequireAuth>
                    <CreateBlog />
                </RequireAuth>
            } />

            <Route path="/admin/blogs/edit/:id" element={
                <RequireAuth>
                    <EditBlog />
                </RequireAuth>
            } />

            <Route path="/admin/blogs/show/:id" element={
                <RequireAuth>
                    <ShowBlog />
                </RequireAuth>
            } />

            {/* Projects  Route End  */}

            <Route path="/admin/banners" element={
                <RequireAuth>
                    <AllBanner />
                </RequireAuth>
            } />
            {/* Banner  Route End  */}

            <Route path="/admin/whys" element={
                <RequireAuth>
                    <AllWhy />
                </RequireAuth>
            } />

            <Route path="/admin/whys/create" element={
                <RequireAuth>
                    <CreateWhy />
                </RequireAuth>
            } />

            <Route path="/admin/whys/edit/:id" element={
                <RequireAuth>
                    <EditWhy />
                </RequireAuth>
            } />

            <Route path="/admin/whys/show/:id" element={
                <RequireAuth>
                    <ShowWhy />
                </RequireAuth>
            } />

            {/* Why  Route End  */}


            <Route path="/admin/testis" element={
                <RequireAuth>
                    <AllTesti />
                </RequireAuth>
            } />

            <Route path="/admin/testis/create" element={
                <RequireAuth>
                    <CreateTesti />
                </RequireAuth>
            } />

            <Route path="/admin/testis/edit/:id" element={
                <RequireAuth>
                    <EditTesti />
                </RequireAuth>
            } />

            <Route path="/admin/testis/show/:id" element={
                <RequireAuth>
                    <ShowTesti />
                </RequireAuth>
            } />

            {/* Why  Route End  */}
        </Route>
    ))

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-center"
                theme="dark"
                transition={Bounce}
            />
        </>
    )
}

export default App
