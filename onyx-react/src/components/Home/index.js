import React from "react";
import { useState } from "react";
import { Container, Accordion  } from "react-bootstrap";
import "./index.css";

const Home = () => {
    return (
        <>
            <Container fluid className="container-home bg-image"></Container>
            <Container className="container banner-text">
                <Container className="row">
                    <Container className="col">
                        <h1 className="header-text">
                            {" "}
                            Sigue tus <br />
                            entrenamientos <br /> y dietas en un <br /> solo
                            lugar{" "}
                        </h1>
                        <h2 className="subheader-text">
                            Lo que es medible es <br />
                            perfeccionable
                        </h2>
                    </Container>
                </Container>
            </Container>

            <Container className="container mt-5">
                <Container className="row mb-3">
                    <Container className="col">
                        <h1 id="faq" className="text-center">
                            {" "}
                            Sobre Nosotros{" "}
                        </h1>
                    </Container>
                </Container>
                <Container className="row">
                    <Container className="col">
                        <p className="text-center">
                            Onyx es una plataforma que te permite llevar un
                            control de tus entrenamientos y dietas, así como
                            llevar un registro de tu progreso.
                        </p>
                    </Container>
                </Container>
                <Container className="row"></Container>
            </Container>

            <Container className="container mt-5">
                <Container className="row mb-3">
                    <Container className="col">
                        <h2 className="text-center"> Preguntas Frecuentes </h2>
                    </Container>
                </Container>
                <Container className="row">
                    <Container className="col">
                        <Accordion bsPrefix="accordion">
                            <Accordion.Item eventKey="0" bsPrefix="accordion-item">
                                <Accordion.Header bsPrefix="accordion-header">
                                    ¿Qué es Onyx?
                                </Accordion.Header>
                                <Accordion.Body bsPrefix="accordion-body">
                                    Onyx es una plataforma que te permite llevar
                                    un control de tus entrenamientos y dietas,
                                    así como llevar un registro de tu progres
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" bsPrefix="accordion-item">
                                <Accordion.Header bsPrefix="accordion-header">
                                    ¿Cómo funciona?
                                </Accordion.Header>
                                <Accordion.Body bsPrefix="accordion-body">
                                    Para comenzar a utilizar Onyx, debes
                                    registrarte en la plataforma, una vez hecho
                                    esto, podrás comenzar a crear tus propios
                                    entrenamientos y dietas, así como llevar un
                                    registro de tu progreso.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" bsPrefix="accordion-item">
                                <Accordion.Header bsPrefix="accordion-header">
                                    ¿Qué puedo hacer en Onyx?
                                </Accordion.Header>
                                <Accordion.Body bsPrefix="accordion-body">
                                    En Onyx podrás crear tus propios
                                    entrenamientos y dietas, así como llevar un
                                    registro de tu progreso.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default Home;
