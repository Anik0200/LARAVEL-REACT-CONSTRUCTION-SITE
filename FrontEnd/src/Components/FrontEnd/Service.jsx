import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss'
import Api from '../../Api'
import Pagination from '../Common/Pagination'

const Service = () => {

    // Api
    const { http } = Api();

    //State
    const [services, setServices] = useState([]);
    const [paginateServices, sepaginateSetrvices] = useState([]);
    const [page, setPage] = useState(1);


    //Get All Services
    useEffect(() => {
        getServices();
    }, [page])

    //Get All Services
    const getServices = () => {
        http.get(`frontend/fetch-all-service?page=${page}`).then((res) => {
            setServices(res.data.service.data);
            sepaginateSetrvices(res.data.service);
        })
    }

    return (
        <>
            <Header />

            <main>
                <Hero preHeading={'Quality, Integrity, Value.'}
                    heading={'Our Services'}
                    text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ab.'} />

                <section className='section-3 bg-light'>
                    <div className="container">
                        <div className="section-header text-center mb-5">
                            <span>Our Services</span>
                            <h2>Our Construction Services</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing!
                            </p>
                        </div>

                        <div className="row">
                            {
                                services &&
                                services.map(service => (
                                    <div className="col-md-6 col-lg-4 mb-3" key={service.id}>
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

                                                <Link to={`/service/details/${service.id}`} className='btn btn-primary-custom btn-sm'>
                                                    Read More
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='d-flex justify-content-start mt-4'>
                            <Pagination data={paginateServices} setPage={setPage} />
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}

export default Service
