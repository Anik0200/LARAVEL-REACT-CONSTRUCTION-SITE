import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6">
                            <span>UrbanEdge Construction</span>
                            <p className='footer-text'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet nemo praesentium
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <span>UrbanEdge Construction</span>
                            <ul className='footer-text'>
                                <li><Link>Specialty Construction</Link></li>
                                <li><Link>Civil Construction</Link></li>
                                <li><Link>Residential Construction</Link></li>
                                <li><Link>Corporate Construction</Link></li>
                                <li><Link>Building Construction</Link></li>
                                <li><Link>Industrial Construction</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <span>UrbanEdge Construction</span>
                            <ul className='footer-text'>
                                <li><Link>About US</Link></li>
                                <li><Link>Services</Link></li>
                                <li><Link>Projects</Link></li>
                                <li><Link>Blog</Link></li>
                                <li><Link>Contact</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <span>UrbanEdge Construction</span>
                            <ul className='footer-text'>
                                <li>(888-000-88)</li>
                                <li>info@gmail.com</li>
                                <li>Braisal 8200</li>
                                <li>Bangladesh</li>
                                <li>01700000000</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
