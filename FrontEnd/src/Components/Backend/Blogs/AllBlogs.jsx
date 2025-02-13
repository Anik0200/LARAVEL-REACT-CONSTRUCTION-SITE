import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';
import Api from '../../../Api';

import Header from '../../Common/Header'
import Footer from '../../Common/Footer'
import SideBar from '../../Common/SideBar';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaBullseye } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

import '../../../assets/css/Style.scss';
import '../../../assets/css/Responsive.scss'
import { toast } from 'react-toastify';
import PaginationTwo from '../../Common/PaginationTwo';

const AllBlogs = () => {

    // Context
    const { logout } = useContext(AuthContext);

    // Api
    const { http } = Api();

    //State
    const [blogs, setBlogs] = useState([]);

    const [paginateBlogs, setPaginateBlogs] = useState(null);
    const [page, setPage] = useState(1);

    //Get All Blogs
    useEffect(() => {
        fetchBlogs(page)
    }, [page])

    const fetchBlogs = () => {
        http.get(`/blog?page=${page}`).then((res) => {
            setBlogs(res.data.blogs.data);
            setPaginateBlogs(res.data.blogs);
        })
    }


    const dltBlog = (id) => {
        http.delete(`/blog/${id}`).then(res => {

            if (blogs.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                fetchBlogs(page);
            }

            if (res.data.status == true) {
                setBlogs(blogs.filter(blog => blog.id !== id))
                toast.success(res.data.message);
            }

            if (res.data.status == false) {
                toast.error(res.data.message);
            }
        })
    }

    return (
        <>
            <Header />
            <main>
                <section className='section-dashboard py-5'>
                    <div className="container">
                        <div className="row">

                            <div className="col-md-3">
                                <SideBar LogoutBtn={logout} />
                            </div>

                            <div className="col-md-9">
                                <div className="card border-0 shadow rounded-3 p-4">
                                    <div className="card-body">

                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h4 className='text-uppercase fw-bold '>Blog</h4>
                                            <Link className='text-success fs-2' to={'/admin/blogs/create'}>
                                                <CiCirclePlus />
                                            </Link>
                                        </div>

                                        <div className='table-responsive'>
                                            <table className='table  table-dark mt-3'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Photo</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Slug</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        blogs.map((blog) => (
                                                            <tr key={blog.id} >
                                                                <td>{blog.id}</td>
                                                                <td>
                                                                    <img src={`http://127.0.0.1:8000/images/${blog.image}`} alt="project img" width={50} />
                                                                </td>
                                                                <td>{blog.title}</td>
                                                                <td>{blog.slug}</td>
                                                                <td>
                                                                    <div className='d-flex gap-3 align-items-center'>
                                                                        <Link className='text-info fs-5' to={`/admin/blogs/show/${blog.id}`}>
                                                                            <FaBullseye />
                                                                        </Link>

                                                                        <Link className='text-success fs-5' to={`/admin/blogs/edit/${blog.id}`}>
                                                                            <MdEdit />
                                                                        </Link>

                                                                        <Link className='text-danger fs-5'
                                                                            onClick={() => dltBlog(blog.id)}>
                                                                            <MdDelete />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>

                                            <div className='d-flex justify-content-end mt-3'>
                                                {paginateBlogs && <PaginationTwo data={paginateBlogs} setPage={setPage} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default AllBlogs
