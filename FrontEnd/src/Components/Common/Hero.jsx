import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/Hero.scss';

const Hero = ({ preHeading, heading, text }) => {
    return (
        <>
            <section className='Hero d-flex align-items-center' >
                <div className='container'>
                    <div className="hero">
                        <div className="text-start">
                            <span>{preHeading}</span>
                            <h1 className='mt-2 mb-2'>{heading}</h1>
                            <p>
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
