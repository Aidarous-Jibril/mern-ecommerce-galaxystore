import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter} from "react-router-dom";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
//Pages
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
import UserEditPage from "./Pages/UserEditPage";
import ProductListPage from "./Pages/ProductListPage";
import ProductDetailsEditPage from "./Pages/ProductDetailsEditPage";
import OrderListPage from "./Pages/OrderListPage";


function App() {

  return (
      <div className="App">
        <BrowserRouter>
          <Header /> 
          <main className="py-3">
            <Container>
              <header className="App-header">
                
                <Routes>
                  <Route exact path='/' element={<HomePage />} />
                  <Route path="/product/:id" element={< ProductDetailsPage />} />
                  <Route path="/search/product/:id" element={< ProductDetailsPage />} />
                  <Route path="/page/product/:id" element={< ProductDetailsPage />} />
                  <Route path="/cart/:id?" element={< CartPage />} />
                  <Route path="/login" element={< LoginPage />} />
                  <Route path="/register" element={< RegisterPage />} />
                  <Route path="/contact-us" element={< ContactUs />} />
                  <Route path="/profile" element={< UserProfilePage />} />
                  <Route path="/shipping" element={< ShippingPage />} />
                  <Route path="/payment" element={< PaymentPage />} />
                  <Route path="/placeorder" element={< PlaceOrderPage />} />
                  <Route path="/order/:id" element={< OrderPage />} />
                  <Route path="/admin/userlist" element={< UserListPages />} /> 
                  <Route path="/admin/user/:id/edit" element={< UserEditPage />} />
                  <Route exact path="/admin/productlist" element={< ProductListPage />} />
                  <Route exact path="/admin/productlist/:pageNumber" element={< ProductListPage />} />
                  <Route path="/admin/product/:id/edit" element={< ProductDetailsEditPage />} />
                  <Route path="/admin/orderlist" element={< OrderListPage />} />
                  <Route exact path="/search/:keyword" element={<HomePage />} />
                  <Route exact path='/page/:pageNumber' element={<HomePage />} />
                  <Route exact path='/search/:keyword/page/:pageNumber' element={<HomePage />} />
                </Routes> 

              </header> 
            </Container>
          </main>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
