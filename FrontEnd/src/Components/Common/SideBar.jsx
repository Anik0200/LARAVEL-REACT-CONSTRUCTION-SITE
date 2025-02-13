import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss'

const SideBar = ({ LogoutBtn }) => {
    return (
        <>
            <div className="card border-0 shadow rounded-3 p-2">
                <div className="card-body">
                    <h4 className='text-uppercase'>UrbanEdge</h4>

                    <ul className='mt-3 d-flex flex-column gap-2 p-0'>
                        <li><Link to={'/admin/dashboard'} className='nav-link'>Dashboard</Link></li>
                        <li><Link to={'/admin/banners'} className='nav-link'>Banner</Link></li>
                        <li><Link to={'/admin/service'} className='nav-link'>Services</Link></li>
                        <li><Link to={'/admin/projects'} className='nav-link'>Projects</Link></li>
                        <li><Link to={'/admin/blogs'} className='nav-link'>Blog</Link></li>
                        <li><Link to={'/admin/whys'} className='nav-link'>Why</Link></li>
                        <li><Link to={'/admin/testis'} className='nav-link'>Testimonial</Link></li>

                        <li>
                            <button onClick={LogoutBtn} className='btn btn-danger mt-3'>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar
