import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';


import { AuthContext } from '../Context/Auth';

import Header from '../../Common/Header'
import Footer from '../../Common/Footer'
import SideBar from '../../Common/SideBar';


import Api from '../../../Api';
import Editor from 'react-simple-wysiwyg';

import '../../../assets/css/Style.scss';
import '../../../assets/css/Responsive.scss'
import { toast } from 'react-toastify';

const CreateTesti = () => {

    // Context
    const { logout } = useContext(AuthContext)

    //Base Api
    const { http } = Api();

    // Navigate
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [titleError, setTitleError] = useState('');
    const [subTitleError, setSubTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear Errors
        setTitleError('');
        setSubTitleError('');
        setDescriptionError('');
        setImageError('');

        // Create Form Data
        const formData = new FormData();
        formData.append('title', title || '');
        formData.append('subTitle', subTitle || '');
        formData.append('description', description || '');
        formData.append('image', image || '');

        // Call Store Api
        http.post('testi', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => {
            if (res.data.status == false) {
                setTitleError(res.data.error.title);
                setSubTitleError(res.data.error.subTitle);
                setDescriptionError(res.data.error.description);
                setImageError(res.data.error.image);
            }

            if (res.data.status == true) {
                toast.success(res.data.message);
                navigate('/admin/testis')
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
                                            <h4 className='text-uppercase fw-bold'>Create Testimonial</h4>
                                            <Link to={'/admin/testis'} className='btn btn-sm btn-dark'>
                                                BACK
                                            </Link>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Title</label>
                                                    <input type="text" className="form-control"
                                                        onChange={(e) => setTitle(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{titleError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Sub Title</label>
                                                    <input type="text" className="form-control"
                                                        onChange={(e) => setSubTitle(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{subTitleError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Description</label>
                                                    <input type="text" className="form-control"
                                                        onChange={(e) => setDescription(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{descriptionError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Icon</label>
                                                    <input type="file" className="form-control"
                                                        onChange={(e) => setImage(e.target.files[0])} />
                                                    <p className='text-danger fw-bold mt-1'>{imageError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <button className='btn btn-sm btn-success' onClick={handleSubmit}>Create</button>
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

export default CreateTesti
