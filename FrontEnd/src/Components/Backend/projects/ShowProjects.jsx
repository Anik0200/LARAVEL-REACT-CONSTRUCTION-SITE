import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../Context/Auth';

import Header from '../../Common/Header'
import Footer from '../../Common/Footer'
import SideBar from '../../Common/SideBar';

import Api from '../../../Api';
import { toast } from 'react-toastify';
import Editor from 'react-simple-wysiwyg';

import '../../../assets/css/Style.scss';
import '../../../assets/css/Responsive.scss'

const ShowProjects = () => {

    // Context
    const { logout } = useContext(AuthContext)

    // Project Id
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

    // Fetch Single Project
    useEffect(() => {
        http.get(`project/${id}/edit`).then(res => {
            if (res.data.status == true) {
                setTitle(res.data.project.title)
                setShortDecs(res.data.project.short_description)
                setDescription(res.data.project.description)
                setImagePreview(res.data.project.image)
            }

            if (res.data.status == false) {
                toast.error(res.data.message);
                navigate('/admin/projects')
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
                                            <h4 className='text-uppercase fw-bold '>Show Project</h4>
                                            <Link to={'/admin/projects'} className='btn btn-sm btn-dark'>
                                                BACK
                                            </Link>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Title</label>
                                                    <input type="text" className="form-control" readOnly disabled
                                                        defaultValue={title} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Short Description</label>
                                                    <input type="text" className="form-control" readOnly disabled
                                                        defaultValue={shortDecs} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label text-white">Description</label>
                                                    <Editor value={description}
                                                        containerProps={{ style: { height: '200px' } }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <img src={`http://127.0.0.1:8000/images/${imagePreview}`} className='card-img' style={{ width: '200px', height: '200px' }} alt="" />
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

export default ShowProjects
