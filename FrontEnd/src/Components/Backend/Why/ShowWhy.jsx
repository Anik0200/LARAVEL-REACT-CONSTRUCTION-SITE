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

const ShowWhy = () => {

    // Context
    const { logout } = useContext(AuthContext)

    // Why Id
    const { id } = useParams();

    // Api
    const { http } = Api();

    // Navigate
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState();

    // Fetch Single Why
    useEffect(() => {
        http.get(`why/${id}/edit`).then(res => {
            if (res.data.status == true) {
                setTitle(res.data.why.title)
                setDescription(res.data.why.description)
                setImagePreview(res.data.why.image)
            }

            if (res.data.status == false) {
                toast.success(res.data.message);
                navigate('/admin/whys')
            }
        })
    }, [])


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
                                            <h4 className='text-uppercase fw-bold'>Why</h4>
                                            <Link to={'/admin/whys'} className='btn btn-sm btn-dark'>
                                                BACK
                                            </Link>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Title</label>
                                                    <input type="text" className="form-control" defaultValue={title} readOnly disabled />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Description</label>
                                                    <input type="text" className="form-control" defaultValue={description} readOnly disabled />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <img src={`http://127.0.0.1:8000/images/${imagePreview}`} className='card-img' style={{ width: '100px', height: '100px' }} alt="" />
                                                </div>
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

export default ShowWhy
