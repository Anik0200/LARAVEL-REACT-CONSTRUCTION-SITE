import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss';

import Api from '../../Api'
import PaginationTwo from '../Common/PaginationTwo'


const Project = () => {

    // Api
    const { http } = Api();

    //State
    const [projects, setProjects] = useState([]);
    const [paginateProjects, setPaginateProjects] = useState(null);
    const [page, setPage] = useState(1);

    //Get All Projects
    useEffect(() => {
        getProjects();
    }, [page])

    //Get All Services
    const getProjects = () => {
        http.get(`frontend/fetch-all-project?page=${page}`).then((res) => {
            setProjects(res.data.project.data);
            setPaginateProjects(res.data.project);
        })
    }

    return (
        <>
            <Header />

            <main>
                <Hero preHeading={'Quality, Integrity, Value.'}
                    heading={'Our Projects'}
                    text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ab.'} />

                <section className='section-3 bg-light'>
                    <div className="container">
                        <div className="section-header text-center mb-5">
                            <span>Our Projects</span>
                            <h2>Our Bangladesh Project</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing!
                            </p>
                        </div>

                        <div className="row">
                            {
                                projects && (
                                    projects.map(project => (
                                        <div className="col-md-6 col-lg-4 mb-3" key={project.id}>
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
                                )
                            }
                        </div>

                        <div className='d-flex justify-content-start mt-4'>
                            {paginateProjects && <PaginationTwo data={paginateProjects} setPage={setPage} />}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Project
