import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'

import blogImg from '../../assets/inages/construction3.jpg';

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss';

import Api from '../../Api'
import PaginationTwo from '../Common/PaginationTwo'

const Blog = () => {

    // Api
    const { http } = Api();

    //State
    const [blogs, setBlogs] = useState([]);
    const [paginateBlogs, setPaginateBlogs] = useState(null);
    const [page, setPage] = useState(1);

    //Get All Blogs
    useEffect(() => {
        getBlogs();
    }, [page])

    //Get All Blogs
    const getBlogs = () => {
        http.get(`frontend/fetch-all-blog?page=${page}`).then((res) => {
            setBlogs(res.data.blog.data);
            setPaginateBlogs(res.data.blog);
        })
    }

    return (
        <>
            <Header />

            <main>
                <Hero preHeading={'Quality, Integrity, Value.'}
                    heading={'Our Blogs'}
                    text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ab.'} />

                <section className='section-6 bg-light'>
                    <div className="container">
                        <div className="section-header text-center mb-5">
                            <span>Blog & News</span>
                            <h2>Articles And Blog Post</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing!
                            </p>
                        </div>

                        <div className="row">
                            {
                                blogs &&
                                blogs.map(blog => (
                                    <div className="col-md-6 col-lg-4 mb-2" key={blog.id}>
                                        <div className="card shadow border-0">
                                            <div className="card-img-top">
                                                <img src={`http://127.0.0.1:8000/images/${blog.image}`} className='w-100' alt="" />
                                            </div>
                                            <div className="card-body p-4">
                                                <h2>{blog.title}</h2>
                                                <Link to={`/blog/details/${blog.id}`} className='btn btn-primary-custom btn-sm'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='d-flex justify-content-start mt-4'>
                            {paginateBlogs && <PaginationTwo data={paginateBlogs} setPage={setPage} />}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Blog
