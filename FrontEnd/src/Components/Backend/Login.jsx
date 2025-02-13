import React, { useContext, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'

import Api from '../../Api';

import '../../assets/css/Style.scss';
import '../../assets/css/Responsive.scss'
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/Auth';


const Login = () => {

    const { login, user } = useContext(AuthContext)

    // Navigate
    const navigate = useNavigate();

    //Base Api
    const { http } = Api();

    // State
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Form Data
        const formData = new FormData();
        formData.append('email', email || '');
        formData.append('password', password || '');

        // Call Login API
        http.post('/ahuthenticate', {
            email: email,
            password: password
        })
            .then(res => {
                if (res.data.status == false) {
                    if (res.data.error) {
                        setEmailError(res.data.error.email);
                        setPasswordError(res.data.error.password);
                    }

                    if (res.data.message == 'Invalid email or password') {
                        toast.error(res.data.message);
                    }
                }

                if (res.data.status == true) {
                    const userInfo = {
                        id: res.data.id,
                        token: res.data.token
                    }

                    login(userInfo);
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    toast.success(res.data.message);
                    navigate('/admin/dashboard');
                }
            })
    }

    return user ? <Navigate to="/admin/dashboard" /> : (
        <>
            <Header />
            <main>
                <section className='section-login '>
                    <div className="container">
                        <div className='row justify-content-center'>
                            <div className="col-lg-6">
                                <div className="card shadow border-0 p-4">
                                    <div className="card-header border-0">
                                        <h2 className='text-center'>LOGIN</h2>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group mb-1">
                                                <label className='form-label'>Email</label>
                                                <input type="email" className="form-control" placeholder="Enter email"
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <p className='text-danger fw-bold mt-1'>{emailError}</p>
                                            </div>

                                            <div className="form-group mb-1">
                                                <label className='form-label'>Password</label>
                                                <input type="password" className="form-control" placeholder="Password"
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <p className='text-danger fw-bold mt-1'>{passwordError}</p>
                                            </div>

                                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </form>
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

export default Login
