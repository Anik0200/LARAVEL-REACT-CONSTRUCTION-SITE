import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';
import Api from '../../../Api';

import Header from '../../Common/Header'
import Footer from '../../Common/Footer'
import SideBar from '../../Common/SideBar';
import { toast } from 'react-toastify';

import '../../../assets/css/Style.scss';
import '../../../assets/css/Responsive.scss'

const AllBanner = () => {

    // Context
    const { logout } = useContext(AuthContext);

    // Api
    const { http } = Api();

    // State
    const [preHeading, setPreHeading] = useState();
    const [heading, setHeading] = useState();
    const [subHeading, setSubHeading] = useState();
    const [buttonOne, setButtonOne] = useState();
    const [buttonTwo, setButtonTwo] = useState();
    const [image, setImage] = useState();

    const [imagePreview, setImagePreview] = useState();

    const [preHeadingError, setPreHeadingError] = useState();
    const [headingError, setHeadingError] = useState();
    const [subHeadingError, setSubHeadingError] = useState();

    useEffect(() => {
        http.get('/banner').then(res => {
            setPreHeading(res.data.banner.preHeading);
            setHeading(res.data.banner.heading);
            setSubHeading(res.data.banner.subHeading);
            setButtonOne(res.data.banner.buttonOne);
            setButtonTwo(res.data.banner.buttonTwo);
            setImagePreview(res.data.banner.image);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear Errors
        setPreHeadingError('');
        setHeadingError('');
        setSubHeadingError('');

        const formData = new FormData();
        formData.append('preHeading', preHeading || '');
        formData.append('heading', heading || '');
        formData.append('subHeading', subHeading || '');
        formData.append('buttonOne', buttonOne || '');
        formData.append('buttonTwo', buttonTwo || '');
        formData.append('image', image || '');

        http.post('/banner/updateCreate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.status == true) {
                toast.success(res.data.message);
            }

            if (res.data.status == false) {
                setPreHeadingError(res.data.error.preHeading);
                setHeadingError(res.data.error.heading);
                setSubHeadingError(res.data.error.subHeading);
            }
        });
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
                                            <h4 className='text-uppercase fw-bold '>Banner</h4>
                                        </div>


                                        <div className='row'>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Pre Heading</label>
                                                    <input type="text" className="form-control" defaultValue={preHeading}
                                                        onChange={(e) => setPreHeading(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{preHeadingError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Heading</label>
                                                    <input type="text" className="form-control" defaultValue={heading}
                                                        onChange={(e) => setHeading(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{headingError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Sub Heading</label>
                                                    <input type="text" className="form-control" defaultValue={subHeading}
                                                        onChange={(e) => setSubHeading(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{subHeadingError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Button One</label>
                                                    <input type="url" className="form-control" defaultValue={buttonOne}
                                                        onChange={(e) => setButtonOne(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Button Two</label>
                                                    <input type="url" className="form-control" defaultValue={buttonTwo}
                                                        onChange={(e) => setButtonTwo(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Image</label>
                                                    <input type="file" className="form-control"
                                                        onChange={(e) => setImage(e.target.files[0])} />
                                                </div>

                                                <img src={`http://127.0.0.1:8000/images/${imagePreview}`} className='card-img mb-3' style={{ width: '100px', height: '100px' }} alt="" />
                                            </div>

                                            <div className="col-md-4">
                                                <button className='btn btn-sm btn-success'
                                                    onClick={handleSubmit} >
                                                    Submit
                                                </button>
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

export default AllBanner
