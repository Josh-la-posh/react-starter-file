import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  merchantLoading: false,
  merchantError: null,
  merhcant: [],
  merchantDocumentLoading: false,
  merchantDocumentError: null,
  merhcantDocument: [],
  merchantAccountLoading: false,
  merchantAccountError: null,
  merhcantAccount: [],
  merchantAddressLoading: false,
  merchantAddressError: null,
  merhcantAddress: [],
  merchantContactLoading: false,
  merchantContactError: null,
  merhcantContact: [],
  merchantDomainLoading: false,
  merchantDomainError: null,
  merhcantDomain: [],
  merchantProfileLoading: false,
  merchantProfileError: null,
  merhcantProfile: []
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    merchantStart: (state) => {
      state.merchantLoading = true;
      state.merchantError = null;
    },
    merchantSuccess: (state, action) => {
      state.merchantLoading = false;
      state.merhcant = action.payload;
    },
    merchantFailure: (state, action) => {
      state.merchantLoading = false;
      state.merchantError = action.payload;
    },
    merchantDocumentStart: (state) => {
      state.merchantDocumentLoading = true;
      state.merchantDocumentError = null;
    },
    merchantDocumentSuccess: (state, action) => {
      state.merchantDocumentLoading = false;
      state.merhcantDocument = action.payload;
    },
    merchantDocumentFailure: (state, action) => {
      state.merchantDocumentLoading = false;
      state.merchantDocumentError = action.payload;
    },
    merchantAccountStart: (state) => {
      state.merchantAccountLoading = true;
      state.merchantAccountError = null;
    },
    merchantAccountSuccess: (state, action) => {
      state.merchantAccountLoading = false;
      state.merhcantAccount = action.payload;
    },
    merchantAccountFailure: (state, action) => {
      state.merchantAccountLoading = false;
      state.merchantAccountError = action.payload;
    },
    merchantAddressStart: (state) => {
      state.merchantAddressLoading = true;
      state.merchantAddressError = null;
    },
    merchantAddressSuccess: (state, action) => {
      state.merchantAddressLoading = false;
      state.merhcantAddress = action.payload;
    },
    merchantAddressFailure: (state, action) => {
      state.merchantAddressLoading = false;
      state.merchantAddressError = action.payload;
    },
    merchantContactStart: (state) => {
      state.merchantContactLoading = true;
      state.merchantContactError = null;
    },
    merchantContactSuccess: (state, action) => {
      state.merchantContactLoading = false;
      state.merhcantContact = action.payload;
    },
    merchantContactFailure: (state, action) => {
      state.merchantContactLoading = false;
      state.merchantContactError = action.payload;
    },
    merchantDomainStart: (state) => {
      state.merchantDomainLoading = true;
      state.merchantDomainError = null;
    },
    merchantDomainSuccess: (state, action) => {
      state.merchantDomainLoading = false;
      state.merhcantDomain = action.payload;
    },
    merchantDomainFailure: (state, action) => {
      state.merchantDomainLoading = false;
      state.merchantDomainError = action.payload;
    },
    merchantProfileStart: (state) => {
      state.merchantProfileLoading = true;
      state.merchantProfileError = null;
    },
    merchantProfileSuccess: (state, action) => {
      state.merchantProfileLoading = false;
      state.merhcantProfile = action.payload;
    },
    merchantProfileFailure: (state, action) => {
      state.merchantProfileLoading = false;
      state.merchantProfileError = action.payload;
    }
  },
});

export const { merchantStart, merchantSuccess, merchantFailure, merchantDocumentStart, merchantDocumentSuccess, merchantDocumentFailure, merchantAccountStart, merchantAccountSuccess, merchantAccountFailure, merchantAddressStart, merchantAddressSuccess, merchantAddressFailure, merchantContactStart, merchantContactSuccess, merchantContactFailure, merchantDomainStart, merchantDomainSuccess, merchantDomainFailure, merchantProfileStart, merchantProfileSuccess, merchantProfileFailure } = merchantSlice.actions;

export default merchantSlice.reducer;