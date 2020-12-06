import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import OrderPage from "./Pages/OrderPage";
import UserListPages from "./Pages/UserListPages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <header className="App-header">
              <Route exact path="/" component={HomePage} />
              <Route path="/product/:id" component={ProductDetailsPage} />
              <Route path="/cart/:id?" component={CartPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/profile" component={UserProfilePage} />
              <Route path="/shipping" component={ShippingPage} />
              <Route path="/payment" component={PaymentPage} />
              <Route path="/placeorder" component={PlaceOrderPage} />
              <Route path="/order/:id" component={OrderPage} />
              <Route path="/admin/userlist" component={UserListPages} />
            </header>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
