import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../Context/Auth';

import Header from '../../Common/Header'
import Footer from '../../Common/Footer'
import SideBar from '../../Common/SideBar';

import '../../../assets/css/Style.scss';
import '../../../assets/css/Responsive.scss'

import Editor from 'react-simple-wysiwyg';
import Api from '../../../Api';
import { toast } from 'react-toastify';

const EditService = () => {

    // Context
    const { logout } = useContext(AuthContext)

    // Service Id
    const { id } = useParams();

    // Api
    const { http } = Api();

    // Navigate
    const navigate = useNavigate();

    // States
    const [title, setTitle] = useState();
    const [shortDecs, setShortDecs] = useState();
    const [description, setDescription] = useState();
    const [imagePreview, setImagePreview] = useState();

    const [image, setImage] = useState();

    const [titleError, setTitleError] = useState();
    const [imageError, setImageError] = useState();


    // Fetch Single Service
    useEffect(() => {
        http.get(`service/${id}/edit`).then(res => {
            if (res.data.status == true) {
                setTitle(res.data.service.title)
                setShortDecs(res.data.service.short_description)
                setDescription(res.data.service.description)
                setImagePreview(res.data.service.image)
            }

            if (res.data.status == false) {
                toast.success(res.data.message);
                navigate('/admin/service')
            }
        })

    }, [])

    // Submit Edit Form
    const handleSubmit = (e) => {
        e.preventDefault()

        //Clear Errors
        setTitleError('');
        setImageError('');

        //Create FormData
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', title || '');
        formData.append('short_description', shortDecs || '');
        formData.append('description', description || '');
        formData.append('image', image || '');

        //Call Update API
        http.post(`service/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                if (res.data.status == false) {
                    setTitleError(res.data.error.title);
                    setImageError(res.data.error.image);
                }

                if (res.data.status == true) {
                    toast.success(res.data.message);
                    navigate('/admin/service')
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
                                            <h4 className='text-uppercase fw-bold '>Edit Service</h4>
                                            <Link to={'/admin/service'} className='btn btn-sm btn-dark'>
                                                BACK
                                            </Link>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Title</label>
                                                    <input type="text" className="form-control"
                                                        defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{titleError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Short Description</label>
                                                    <input type="text" className="form-control"
                                                        defaultValue={shortDecs} onChange={(e) => setShortDecs(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Description</label>
                                                    <Editor value={description} onChange={(e) => setDescription(e.target.value)}
                                                        containerProps={{ style: { height: '200px' } }} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Image</label>
                                                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                                    <p className='text-danger fw-bold mt-1'>{imageError}</p>

                                                    <img src={`http://127.0.0.1:8000/images/${imagePreview}`} className='card-img' style={{ width: '100px', height: '100px' }} alt="" />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <button className='btn btn-sm btn-success' onClick={handleSubmit} >Update</button>
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

export default EditService
