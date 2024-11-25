import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BillingNegotiationPage from '../pages/billingNegotiation/BillingNegotiationPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BillingNegotiationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;