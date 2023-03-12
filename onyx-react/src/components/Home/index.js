import React from 'react'
import { useState } from 'react';
import {Container } from 'react-bootstrap';
import './index.css';
import bgImage from '../../images/cover.jpg'

const Home = () => {
    return (
        <Container className='container-fluid bg-image' style={{backgroundImage: 'url(${bgImage})'}}>
            
        <Container className='container banner-text'>
            <Container className='row'>
                <Container className='col'>
                    <h1 className='header-text'> Sigue tus <br />entrenamientos <br />  y dietas en un <br /> solo lugar </h1>
                    <h2 className='subheader-text'>Lo que es medible es <br />perfeccionable</h2>
                </Container>
            </Container>
        </Container>
    </Container>

    )
}

export default Home;