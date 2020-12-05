import React from 'react';
import { Container, Col, Row } from 'react-bootstrap' 

const Footer = () => {
    return (
        <Container>
            <Row>
                <Col className="text-center py-3">
                        copyright &copy; SmallPay   
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
