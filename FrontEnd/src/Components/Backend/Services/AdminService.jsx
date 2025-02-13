import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';
import Api from '../../../Api';

import Header from '../../Common/Header'
import Footer from '../../Common/Footer'
import SideBar from '../../Common/SideBar';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaBullseye } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

import '../../../assets/css/Style.scss';
import '../../../assets/css/Responsive.scss'
import Pagination from '../../Common/Pagination';
import { toast } from 'react-toastify';


const AdminService = () => {

    // Context
    const { logout } = useContext(AuthContext)

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
        http.get(`/service?page=${page}`).then((res) => {
            setServices(res.data.services.data);
            sepaginateSetrvices(res.data.services);
        })
    }

    const dltService = (id) => {
        http.delete(`/service/${id}`).then((res) => {

            if (res.data.status == true) {
                if (services.length == 1 && page > 1) {
                    setPage(page - 1);
                }
                setServices(services.filter(service => service.id !== id))
                toast.success(res.data.message);
            }

            if (res.data.status == false) {
                toast.error(res.data.message);
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
                                            <h4 className='text-uppercase fw-bold '>Services</h4>
                                            <Link to={'/admin/service/create'} className='text-success fs-2'>
                                                <CiCirclePlus />
                                            </Link>
                                        </div>

                                        <div className='table-responsive'>
                                            <table className='table  table-dark mt-3'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Photo</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Slug</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        services &&

                                                        services.map((service, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{service.id}</td>
                                                                    <td>
                                                                        <img src={`http://127.0.0.1:8000/images/${service.image}`}
                                                                            alt={service.image} width={50} />
                                                                    </td>
                                                                    <td>{service.title}</td>
                                                                    <td>{service.slug}</td>
                                                                    <td>
                                                                        <div className='d-flex gap-3 align-items-center'>
                                                                            <Link to={`/admin/service/show/${service.id}`} className='text-info fs-5'>
                                                                                <FaBullseye />
                                                                            </Link>

                                                                            <Link to={`/admin/service/edit/${service.id}`} className='text-success fs-5'>
                                                                                <MdEdit />
                                                                            </Link>

                                                                            <Link className='text-danger fs-5' onClick={() => dltService(service.id)}>
                                                                                <MdDelete />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                            <div className='d-flex justify-content-end mt-3'>
                                                <Pagination data={paginateServices} setPage={setPage} />
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

export default AdminService
