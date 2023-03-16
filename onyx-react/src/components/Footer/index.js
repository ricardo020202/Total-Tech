import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaTwitter} from "react-icons/fa";
import "./index.css";

const Footer = () => {
    return (
        <>
        <Container className="footer-container">
            <Container expand="lg" fluid className="container mt-5 bg-footer">
                <Container className='container'>
                    <Container className="row">
                        <Container className="col mt-5">
                            <h5 className="mb-4"> Navegacion </h5>
                            <ul className="list-unstyled">
                                <li><a href="./index.html">Home</a></li>
                                <li><a href="./html/ejercicios.html">Catalogo de ejercicios</a></li>
                                <li><a href="./html/entrenamientos.html">Catalogo de entrenamientos</a></li>
                                <li><a href="./html/dietas.html">Dietas</a></li>
                                <li><a href="./html/bitacora.html">Bitácora</a></li>
                            </ul>
                        </Container>
                        <Container className="col mt-5">
                            <h5 className="mb-4">Contacto</h5>
                            <ul className="list-unstyled">
                                <li><a href="mailto:a01709449@tec.mx">Correo</a></li>
                                <li><a href="mailto:a01352033@tec.mx">Correo 2</a></li>
                            </ul>
                        </Container>
                        <Container className="col mt-5">
                            <h5 className="mb-4">Legal</h5>
                            <ul className="list-unstyled">
                                <li><a href="./html/terminos.html">Términos y condiciones</a></li>
                                <li><a href="./html/privacidad.html">Política de privacidad</a></li>
                            </ul>
                        </Container>
                        <Container className="col mt-5">
                            <h5>Redes Sociales</h5>
                            <Container className="row mt-4">
                                <Container className='col justify-content-center'>
                                    <a href="https://www.facebook.com/onyxgymapp"><FaFacebook/></a>
                                </Container>
                                <Container className='col justify-content-center'>
                                    <a href="https://www.instagram.com/onyxgymapp/"><FaInstagram/></a>
                                </Container>
                                <Container className='col justify-content-center'>
                                <a href="https://www.instagram.com/onyxgymapp/"><FaTwitter/></a>
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                    <Container className="row">
                        <Container className="col">
                            <p className="text-center rights">
                                © 2023 Onyx. All rights reserved.
                            </p>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
            </>
            );
};

export default Footer;