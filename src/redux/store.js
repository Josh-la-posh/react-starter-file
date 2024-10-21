import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import aggregatorReducer from './slices/aggregatorSlice';
import customerReducer from './slices/customerSlice';
import dashboardReducer from './slices/dashboardSlice';
import disputeReducer from './slices/disputeSlice';
import invoiceReducer from './slices/invoiceSlice';
import merchantReducer from './slices/merchantSlice';
import settlementReducer from './slices/settlementSlice';
import transactionReducer from './slices/transactionSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    aggregator: aggregatorReducer,
    customer: customerReducer,
    dashboard: dashboardReducer,
    dispute: disputeReducer,
    invoice: invoiceReducer,
    merchant: merchantReducer,
    settlement: settlementReducer,
    transaction: transactionReducer,
    users: usersReducer,
  },
});