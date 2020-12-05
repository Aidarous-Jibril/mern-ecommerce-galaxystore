import React from "react";
import { ListGroup, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderItemsPage = ({ item, index }) => {
  return (
    <ListGroup.Item key={index}>
      <Row>
        <Col md={1}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
        </Col>
        <Col md={4}>
          {item.qty} x SEK {item.price} = SEK {item.qty * item.price}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default OrderItemsPage;
