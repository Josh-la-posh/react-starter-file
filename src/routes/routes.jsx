import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import RequireAuth from '../services/hooks/RequiredAuth';
import LoginPage from '../pages/Auth/Login/LoginPage';
import RegisterPage from '../pages/Auth/Register/RegisterPage';
import ResetPasswordPage from '../pages/Auth/ResetPassword/ResetPasswordPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPassword/ForgotPasswordPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import CustomersPage from '../pages/Customers/Customers';
import DisputesPage from '../pages/Disputes/Disputes';
import Aggregator from '../pages/Aggregator/Aggregator';
import AggregatorBank from '../pages/Aggregator/AggregatorBank';
import AggregatorDocument from '../pages/Aggregator/AggregatorDocument';
import MerchantPage from '../pages/Merchant/Merchant';
import AllSettlement from '../pages/Settlement/AllSettlement';
import InvoicesPage from '../pages/Invoices/Invoices';
import TransactionPage from '../pages/Transaction/Transaction';
import SettingsPage from '../pages/Settings/Settings';
import HelpCenter from '../pages/HelpCenter/HelpCenter';
import SettlementConfiguration from '../pages/Settlement/Configuration';
import SettlementBankAccount from '../pages/Settlement/BankAccount';

const RoutesSystem = () => {
  return (
    <Routes>

      {/* public routes */}

      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      {/* <Route path='/confirm-email' element={<ConfirmEmailPage />} /> */}
      {/* <Route path='/complete-registration' element={<RegisterMultiStepPage />} /> */}


      {/* protected routes */}

      <Route element={<RequireAuth />}>
        <Route path='/' element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="disputes" element={<DisputesPage />} />

          <Route path='/aggregator'>
            <Route path="all" element={<Aggregator />} />
            <Route path="bank" element={<AggregatorBank />} />
            <Route path="document" element={<AggregatorDocument />} />
          </Route>
          
          <Route path="merchants" element={<MerchantPage />} />
          <Route path="/settlement" >
            <Route path='all' element={<AllSettlement />} />
            <Route path='bank' element={<SettlementBankAccount />} />
            <Route path='configuration' element={<SettlementConfiguration />} />
          </Route>
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help-center" element={<HelpCenter />} />


          {/* Add other routes */}

          {/* 
          <Route path='/change-password' element={<ChangePasswordPage />} /> */}

          {/* Compliance Routes */}

          {/* <Route path="compliance" element={<ComplianceLayout />} >
            <Route path="contact" element={<ContactForm />} />
            <Route path="profile" element={<ProfileForm />} />
            <Route path="bank" element={<BankForm />} />
            <Route path="business" element={<BusinessForm />} />
            <Route path="service-agreement" element={<MerchantServiceAgreement />} />
            <Route index element={<Navigate to='profile' />} />
          </Route> */}

        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesSystem;