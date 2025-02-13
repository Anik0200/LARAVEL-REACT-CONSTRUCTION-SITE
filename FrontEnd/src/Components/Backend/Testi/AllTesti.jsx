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

const AllTesti = () => {

    // Context
    const { logout } = useContext(AuthContext);

    // Api
    const { http } = Api();

    //State
    const [testis, setTestis] = useState([]);

    const [paginateTestis, setPaginateTestis] = useState(null);
    const [page, setPage] = useState(1);

    //Get All Testimonials
    useEffect(() => {
        fetchTestis()
    }, [page])

    const fetchTestis = () => {
        http.get(`/testi?page=${page}`).then((res) => {
            setTestis(res.data.testis.data);
            setPaginateTestis(res.data.testis);
        })
    }

    const dltTesti = (id) => {
        http.delete(`/testi/${id}`).then(res => {

            if (testis.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                fetchTestis(page);
            }

            if (res.data.status == true) {
                setTestis(testis.filter(testi => testi.id !== id))
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
                                            <h4 className='text-uppercase fw-bold '>Testimonials</h4>
                                            <Link className='text-success fs-2' to={'/admin/testis/create'}>
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
                                                        <th scope="col">Sub Title</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        testis.map((testi) => (
                                                            <tr key={testi.id} >
                                                                <td>{testi.id}</td>
                                                                <td>
                                                                    <img src={`http://127.0.0.1:8000/images/${testi.image}`} alt="project img" width={50} />
                                                                </td>
                                                                <td>{testi.title}</td>
                                                                <td>{testi.subTitle}</td>
                                                                <td>
                                                                    <div className='d-flex gap-3 align-items-center'>
                                                                        <Link className='text-info fs-5' to={`/admin/testis/show/${testi.id}`}>
                                                                            <FaBullseye />
                                                                        </Link>

                                                                        <Link className='text-success fs-5' to={`/admin/testis/edit/${testi.id}`}>
                                                                            <MdEdit />
                                                                        </Link>

                                                                        <Link className='text-danger fs-5'
                                                                            onClick={() => dltTesti(testi.id)}>
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
                                                testis && testis.length > 0 &&
                                                <div className='d-flex justify-content-end mt-3'>
                                                    {paginateTestis && <PaginationTwo data={paginateTestis} setPage={setPage} />}
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

export default AllTesti
