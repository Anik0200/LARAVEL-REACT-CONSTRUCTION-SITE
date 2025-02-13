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

const EditTesti = () => {

    // Context
    const { logout } = useContext(AuthContext)

    // Testi Id
    const { id } = useParams();

    // Api
    const { http } = Api();

    // Navigate
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [imagePreview, setImagePreview] = useState();

    const [titleError, setTitleError] = useState('');
    const [subTitleError, setSubTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    // Fetch Single testi
    useEffect(() => {
        http.get(`testi/${id}/edit`).then(res => {
            if (res.data.status == true) {
                setTitle(res.data.testi.title)
                setSubTitle(res.data.testi.subTitle)
                setDescription(res.data.testi.description)
                setImagePreview(res.data.testi.image)
            }

            if (res.data.status == false) {
                toast.success(res.data.message);
                navigate('/admin/testis')
            }
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        // clear errors
        setTitleError('');
        setSubTitleError('');
        setDescriptionError('');

        // create form data
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', title || '');
        formData.append('subTitle', subTitle || '');
        formData.append('description', description || '');
        formData.append('image', image || '');

        // call update api
        http.post(`testi/${id}`, formData).then(res => {
            if (res.data.status == false) {
                setTitleError(res.data.error.title);
                setSubTitleError(res.data.error.subTitle);
                setDescriptionError(res.data.error.description);
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
                                            <h4 className='text-uppercase fw-bold'>Edit Testimonial</h4>
                                            <Link to={'/admin/testis'} className='btn btn-sm btn-dark'>
                                                BACK
                                            </Link>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Title</label>
                                                    <input type="text" className="form-control" defaultValue={title}
                                                        onChange={(e) => setTitle(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{titleError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Sub Title</label>
                                                    <input type="text" className="form-control" defaultValue={subTitle}
                                                        onChange={(e) => setSubTitle(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{subTitleError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Description</label>
                                                    <input type="text" className="form-control" defaultValue={description}
                                                        onChange={(e) => setDescription(e.target.value)} />
                                                    <p className='text-danger fw-bold mt-1'>{descriptionError}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Icon</label>
                                                    <input type="file" className="form-control"
                                                        onChange={(e) => setImage(e.target.files[0])} />

                                                    <img src={`http://127.0.0.1:8000/images/${imagePreview}`} className='card-img mt-2'
                                                        style={{ width: '100px', height: '100px' }} alt="" />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <button className='btn btn-sm btn-success' onClick={handleSubmit}>
                                                    Update
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

export default EditTesti
