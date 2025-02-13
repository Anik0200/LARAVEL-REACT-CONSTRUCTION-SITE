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
import { toast } from 'react-toastify';
import PaginationTwo from '../../Common/PaginationTwo';

const AllWhy = () => {

    // Context
    const { logout } = useContext(AuthContext);

    // Api
    const { http } = Api();

    //State
    const [whys, setWhys] = useState([]);

    const [paginateWhys, setPaginateWhys] = useState(null);
    const [page, setPage] = useState(1);

    //Get All Whys
    useEffect(() => {
        fetchWhys(page)
    }, [page])

    const fetchWhys = () => {
        http.get(`/why?page=${page}`).then((res) => {
            setWhys(res.data.whys.data);
            setPaginateWhys(res.data.whys);
        })
    }

    const dltWhy = (id) => {
        http.delete(`/why/${id}`).then(res => {

            if (whys.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                fetchWhys(page);
            }

            if (res.data.status == true) {
                setWhys(whys.filter(why => why.id !== id))
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
                                            <h4 className='text-uppercase fw-bold '>Why</h4>
                                            <Link className='text-success fs-2' to={'/admin/whys/create'}>
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
                                                        whys.map((why) => (
                                                            <tr key={why.id} >
                                                                <td>{why.id}</td>
                                                                <td>
                                                                    <img src={`http://127.0.0.1:8000/images/${why.image}`} alt="project img" width={50} />
                                                                </td>
                                                                <td>{why.title}</td>
                                                                <td>{why.slug}</td>
                                                                <td>
                                                                    <div className='d-flex gap-3 align-items-center'>
                                                                        <Link className='text-info fs-5' to={`/admin/whys/show/${why.id}`}>
                                                                            <FaBullseye />
                                                                        </Link>

                                                                        <Link className='text-success fs-5' to={`/admin/whys/edit/${why.id}`}>
                                                                            <MdEdit />
                                                                        </Link>

                                                                        <Link className='text-danger fs-5'
                                                                            onClick={() => dltWhy(why.id)}>
                                                                            <MdDelete />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            {
                                                whys && whys.length > 0 &&
                                                <div className='d-flex justify-content-end mt-3'>
                                                    {paginateWhys && <PaginationTwo data={paginateWhys} setPage={setPage} />}
                                                </div>
                                            }
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

export default AllWhy
