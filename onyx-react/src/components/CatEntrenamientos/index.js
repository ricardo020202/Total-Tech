import React from "react";
import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./index.css";


const CatEntrenamientos = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card className="card-custum text-center">
                            <Card.Img variant="top" src="https://media.istockphoto.com/id/542197916/photo/running-on-treadmill.jpg?s=612x612&w=0&k=20&c=CYywmb71uOepSHWa534hG9230AzawSa4i3sA89o4qCQ=" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary" >Start</Button> <br/>
                                <Button variant="">Más Información</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
            </Container>
        </>
    );
};

export default CatEntrenamientos;