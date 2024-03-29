import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer.js";
import { saveShippingAddress } from "../redux/actions/cartActions.js";
import CheckoutProcessSteps from "../components/CheckoutProcessSteps.js";

const ShippingPage = () => {
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address);
  const [postNumber, setPostNumber] = useState(shippingAddress.postNumber);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();



  //Submit
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postNumber, city, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutProcessSteps step1 step2 />

      <h1>Leverans Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Post Nummer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Post Nummer"
            value={postNumber}
            onChange={(e) => setPostNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Ort</Form.Label>
          <Form.Control
            type="text"
            placeholder="Stad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Land</Form.Label>
          <Form.Control
            type="text"
            placeholder="Land"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Betalning
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
