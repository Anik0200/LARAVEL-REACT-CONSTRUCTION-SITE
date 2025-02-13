import React, { useEffect, useState } from "react";

import Footer from '../Common/Footer';
import Header from '../Common/Header'

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss';
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../Api";


const ServiceDetails = () => {

    // Navigate
    const Navigate = useNavigate()

    // Service Id
    const { id } = useParams();

    // Api
    const { http } = Api();

    // State
    const [service, setService] = useState([]);

    // Call Show Api
    useEffect(() => {
        http.get(`frontend/fetch-single-service/${id}`).then(res => {
            if (res.data.status == true) {
                setService(res.data.service)
            }

            if (res.data.status == false) {
                Navigate('/');
            }
        })
    }, [])

    return (
        <>
            <Header />
            <section className='section-2 mb-3'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5">
                            <img src={`http://127.0.0.1:8000/images/${service.image}`}  className='w-100' alt="" />
                        </div>


                        <div className="col-lg-6">
                            <div className="text">
                                <h2 className="fs-3 text-uppercase">{service.title}</h2>
                                <span className="fs-4 text-lowercase">{service.slug}</span>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="text">
                                <p className="fs-6">{service.short_description}</p>
                                <p dangerouslySetInnerHTML={{ __html:service.description }} className="fs-6"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ServiceDetails
