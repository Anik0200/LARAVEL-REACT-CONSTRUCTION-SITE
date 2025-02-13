import React, { useContext } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss'
import SideBar from '../Common/SideBar';
import { AuthContext } from './Context/Auth';

const Dashboard = () => {

    const { logout } = useContext(AuthContext)

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
                                <div className="card border-0 shadow rounded-3 p-4 d-flex align-items-center justify-content-center">
                                    <div className="card-body">
                                        <h4>Dashboard</h4>
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

export default Dashboard
