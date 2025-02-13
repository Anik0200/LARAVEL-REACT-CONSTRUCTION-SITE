import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import { Link } from 'react-router-dom'

import author from '../../assets/inages/author-2.jpg';

import Footer from '../Common/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FaStar } from "react-icons/fa";

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import Api from '../../Api';

const Home = () => {

    // State
    const [service, SetService] = useState([]);
    const [project, SetProject] = useState([]);
    const [blog, SetBlog] = useState([]);
    const [banner, SetBanner] = useState();
    const [why, SetWhy] = useState([]);
    const [testi, SetTesti] = useState([]);

    // Api
    const { http } = Api();

    useEffect(() => {
        http.get('frontend/fetch-four-service').then(res => {
            SetService(res.data.service)
        })
    }, [])

    useEffect(() => {
        http.get('frontend/fetch-four-project').then(res => {
            SetProject(res.data.project)
        })
    }, [])

    useEffect(() => {
        http.get('frontend/fetch-four-blog').then(res => {
            SetBlog(res.data.blog)
        })
    }, [])

    useEffect(() => {
        http.get('frontend/fetch-all-banner').then(res => {
            SetBanner(res.data.banner)
        })
    }, [])

    useEffect(() => {
        http.get('frontend/fetch-all-why').then(res => {
            SetWhy(res.data.whys);
        })
    }, [])

    useEffect(() => {
        http.get('frontend/fetch-all-testi').then(res => {
            SetTesti(res.data.testis);
        })
    }, [])


    return (
        <>
            <Header />

            <main>
                {/* Banner  */}
                {
                    banner &&
                    <section className='section-1 d-flex align-items-center'
                        style={{ backgroundImage: `url(http://127.0.0.1:8000/images/${banner.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <div className='container-fluid'>
                            <div className="hero">
                                <div className="text-center">
                                    <span>{banner.preHeading}</span>
                                    <h1 className='mt-2 mb-2'>{banner.heading}</h1>
                                    <p>{banner.subHeading}</p>
                                </div>

                                <div className='d-flex justify-content-center gap-2 mt-4'>
                                    <Link to={`${banner.buttonOne}`} className='btn btn-primary-custom'>Contact Now</Link>
                                    <Link to={`${banner.buttonTwo}`} className='btn btn-secondary-custom'>View Project</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                {/* Services  */}
                {
                    service &&
                    <section className='section-3 bg-light'>
                        <div className="container-fluid">
                            <div className="section-header text-center mb-5">
                                <span>Our Services</span>
                                <h2>Our Construction Services</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing!
                                </p>
                            </div>

                            <div className="row">
                                {
                                    service.map(service => (
                                        <div className="col-md-6 col-lg-3 mb-3" key={service.id}>
                                            <div className="item">

                                                <div className="service-image">
                                                    <img src={`http://127.0.0.1:8000/images/${service.image}`} className='w-100' alt="" />
                                                </div>

                                                <div className="service-body">
                                                    <div className="service-title">
                                                        <h3>{service.title}</h3>
                                                    </div>

                                                    <div className="service-content">
                                                        <p>{service.short_description}</p>
                                                    </div>

                                                    <Link to={`/service/details/${service.id}`} className='btn btn-primary-custom btn-sm'>Read More</Link>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='d-flex justify-content-center mt-4'>
                                <Link to={'/service'} className='btn btn-primary-custom'>More Services</Link>
                            </div>
                        </div>
                    </section>
                }

                {/* Why Chose Us  */}
                {
                    why &&
                    <section className='section-4'>
                        <div className="container">

                            <div className="section-header text-center mb-5">
                                <span>Why Chose US</span>
                                <h2>Descover Our Wide Variety Of Projects</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing!
                                </p>
                            </div>

                            <div className="row">
                                {
                                    why.map(why => (
                                        <div className="col-lg-4 col-md-6 mb-3" key={why.id}>
                                            <div className="card border-0 shadow p-4 rounded-5">
                                                <div className="card-icon">
                                                    <img src={`http://127.0.0.1:8000/images/${why.image}`} alt="" />
                                                </div>

                                                <div className="card-title mt-3 mb-1">
                                                    <h3>{why.title}</h3>
                                                </div>
                                                <p>{why.description}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </section>
                }

                {/* Our Projects  */}
                {
                    project &&
                    <section className='section-3 bg-light'>
                        <div className="container-fluid">
                            <div className="section-header text-center mb-5">
                                <span>Our Projects</span>
                                <h2>Our Bangladesh Project</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing!
                                </p>
                            </div>

                            <div className="row">
                                {
                                    project.map(project => (
                                        <div className="col-md-6 col-lg-3 mb-3" key={project.id}>
                                            <div className="item">

                                                <div className="service-image">
                                                    <img src={`http://127.0.0.1:8000/images/${project.image}`} className='w-100' alt="" />
                                                </div>

                                                <div className="service-body">
                                                    <div className="service-title">
                                                        <h3>{project.title}</h3>
                                                    </div>

                                                    <div className="service-content">
                                                        <p>{project.short_description}</p>
                                                    </div>

                                                    <Link to={`/project/details/${project.id}`} className='btn btn-primary-custom'>
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='d-flex justify-content-center mt-4'>
                                <Link to={'/project'} className='btn btn-primary-custom'>More Projects</Link>
                            </div>
                        </div>
                    </section>
                }

                {/* Testimonials */}
                {
                    testi &&
                    <section className='section-5'>
                        <div className="container">
                            <div className="section-header text-center mb-5">
                                <span>Testimonials</span>
                                <h2>What People Are Saying About Us</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing!
                                </p>
                            </div>

                            <Swiper
                                modules={[Pagination]}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                spaceBetween={50}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}

                            >
                                {
                                    testi.map(testi => (
                                        <SwiperSlide key={testi.id}>
                                            <div className="card border-0 shadow rounded-5 p-4">
                                                <div className='card-content'>
                                                    <p>{testi.description}</p>
                                                </div>

                                                <div className="card-user mt-3 d-flex gap-4 align-items-center">
                                                    <div>
                                                        <img src={`http://127.0.0.1:8000/images/${testi.image}`} className='w-100' alt="" />
                                                    </div>
                                                    <div className='user-info'>
                                                        <h3 className='mb-0 mt-0'>{testi.title}</h3>
                                                        <p className='mb-0 mt-0'>{testi.subTitle}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </section>
                }

                {/* Blog */}
                {
                    blog &&
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
                                    blog.map(blog => (
                                        <div className="col-md-6 col-lg-4 mb-2" key={blog.id}>
                                            <div className="card shadow border-0">
                                                <div className="card-img-top">
                                                    <img src={`http://127.0.0.1:8000/images/${blog.image}`} className='w-100' alt="" />
                                                </div>
                                                <div className="card-body p-4">
                                                    <h2>{blog.title}</h2>
                                                    <Link to={`/blog/details/${blog.id}`} className='btn btn-primary-custom btn-sm'>
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='d-flex justify-content-center mt-4'>
                                <Link to={'/blog'} className='btn btn-primary-custom'>More Blogs</Link>
                            </div>
                        </div>
                    </section>
                }
            </main>

            <Footer />
        </>
    )
}

export default Home
