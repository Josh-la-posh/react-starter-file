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
import HelpCenter from '../pages/HelpCenter/HelpCenter';
import SettlementConfiguration from '../pages/Settlement/Configuration';
import SettlementBankAccount from '../pages/Settlement/BankAccount';
import SettingsLayout from '../layout/SettingsLayout';
import ProfilePage from '../pages/Settings/Profile';
import SecuritySettings from '../pages/Settings/SecuritySettingsPage';
import NotificationSettings from '../pages/Settings/NotificationSettingsPage';
import PrivacySettings from '../pages/Settings/PrivacySettings';
import AddMerchantPage from '../pages/Merchant/AddMerchant';
import MerchantProfile from '../pages/Merchant/MerchantProfile';
import MerchantProfileUpdate from '../pages/Merchant/ProfileUpdate';
import MerchantDomain from '../pages/Merchant/MerchantDomain';
import MerchantDocument from '../pages/Merchant/MerchantDocument';
import MerchantCredential from '../pages/Merchant/MerchantCredentials';
import SettlementBatchTransaction from '../pages/Settlement/SettlementBatchTransaction';
import ContactPage from '../pages/Settings/Contact';

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
          
          <Route path="/merchants">
            <Route path='' element={<MerchantPage />} />
            <Route path='addNew' element={<AddMerchantPage />} />
            <Route path='profile/:merchantCode' element={<MerchantProfile />} />
            <Route path='profile/update' element={<MerchantProfileUpdate />} />
            <Route path='domain/:merchantCode' element={<MerchantDomain />} />
            <Route path='document/:merchantCode' element={<MerchantDocument />} />
            <Route path='credential' element={<MerchantCredential />} />
          </Route>
          <Route path="/settlement" >
            <Route path='all' element={<AllSettlement />} />
            <Route path='batch/transaction' element={<SettlementBatchTransaction />} />
            <Route path='bank' element={<SettlementBankAccount />} />
            <Route path='configuration' element={<SettlementConfiguration />} />
          </Route>
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path='/settings' element={<SettingsLayout/>}>
            <Route path='/settings'>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="notification" element={<NotificationSettings />} />
              <Route path="privacy" element={<PrivacySettings />} />
              {/* <Route path="user" element={<UserManagementTable />} /> */}
            </Route>
          </Route>


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