import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import SignupPage from './landing_page/signup/Signup';
import PricingPage from './landing_page/pricing/PricingPage';
import ProductPage from './landing_page/products/ProductPage';
import SupportPage from './landing_page/support/SupportPage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Foooter';
import NotFound from './landing_page/NotFound';
import LoginPage from './landing_page/login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Navbar />

    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/products" element={<ProductPage />} />
    <Route path="/support" element={<SupportPage />} />
    <Route path="*" element={<NotFound />} />
    </Routes>

    <Footer />
  </HashRouter>
);