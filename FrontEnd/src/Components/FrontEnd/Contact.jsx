import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss';

import Api from '../../Api'
import { toast } from 'react-toastify';

const Contact = () => {

    //Api
    const { http } = Api();

    // state
    const [name, setName] = useState();
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [subject, setSubject] = useState()
    const [message, setMessage] = useState()

    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState()
    const [phoneError, setPhoneError] = useState()
    const [subjectError, setSubjectError] = useState()
    const [messageError, setMessageError] = useState()

    const [loading, setLoading] = useState(false);

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true);

        //Claer Inputs
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');

        //Clear Errors
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setSubjectError('');
        setMessageError('');


        // Create Form Data
        const formData = new FormData();
        formData.append('name', name || '');
        formData.append('email', email || '');
        formData.append('phone', phone || '');
        formData.append('subject', subject || '');
        formData.append('message', message || '');

        // Call Mail Api
        http.post('/contact-mail', formData).then(res => {
            if (res.data.status == false) {
                setNameError(res.data.error.name);
                setEmailError(res.data.error.email);
                setPhoneError(res.data.error.phone);
                setSubjectError(res.data.error.subject);
                setMessageError(res.data.error.message);
                setLoading(false);
            }

            if (res.data.status == true) {
                toast.success(res.data.message);
                setLoading(false);
            }
        });
    }


    return (
        <>
            <Header />

            <main>
                <Hero preHeading={'Quality, Integrity, Value.'}
                    heading={'Contact Us'}
                    text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ab.'} />

                <section className='section-contact'>
                    <div className="container">

                        <div className="section-header text-center mb-5">
                            <span>Contact Us</span>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing!
                            </p>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 mb-3">
                                <div className="card card1 shadow border-0 p-4 rounded-5">
                                    <div className='call-us mb-2'>
                                        <h4 className='m-0 mb-2'>Call US</h4>
                                        <p className='m-0'>(888-000-888)</p>
                                        <p className='m-0'>(222-222-222)</p>
                                    </div>
                                    <div className='mail-us mb-2'>
                                        <h4 className='m-0 mb-2'>You Can Write US</h4>
                                        <p className='m-0'>mdabdul@.com</p>
                                        <p className='m-0'>mdabdul@.com</p>
                                    </div>
                                    <div className='address mb-2'>
                                        <h4 className='m-0 mb-2'>Address</h4>
                                        <p className='m-0'>Dhaka, Bangladesh</p>
                                        <p className='m-0'>Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9 mb-3">
                                <div className="card card2 shadow border-0 rounded-5 p-4">
                                    <div className="row">

                                        <div className="col-lg-6 mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" placeholder='Enter Your Name'
                                                onChange={(e) => setName(e.target.value)} />
                                            <p className='fw-bold text-danger mt-1'>{nameError}</p>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" placeholder='Enter Your Email'
                                                onChange={(e) => setEmail(e.target.value)} />
                                            <p className='fw-bold text-danger mt-1'>{emailError}</p>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className="form-label">Phone</label>
                                            <input type="tel" className="form-control" placeholder='Phone No.'
                                                onChange={(e) => setPhone(e.target.value)} />
                                            <p className='fw-bold text-danger mt-1'>{phoneError}</p>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label className="form-label">Subject</label>
                                            <input type="text" className="form-control" placeholder='Subject'
                                                onChange={(e) => setSubject(e.target.value)} />
                                            <p className='fw-bold text-danger mt-1'>{subjectError}</p>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <label className="form-label">Message</label>
                                            <textarea type="text" className="form-control" placeholder='Your Message' rows={5}
                                                onChange={(e) => setMessage(e.target.value)}></textarea>
                                            <p className='fw-bold text-danger mt-1'>{messageError}</p>
                                        </div>

                                    </div>

                                    <div>
                                        {
                                            loading ?
                                                <button className="btn btn-primary-custom" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Loading...</span>
                                                </button>
                                                :
                                                <button className="btn btn-primary-custom" onClick={handleSubmit}>
                                                    Send Message
                                                </button>
                                        }
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

export default Contact
