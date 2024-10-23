import { merchantAccountFailure, merchantAccountStart, merchantAddressFailure, merchantAddressStart, merchantContactFailure, merchantContactStart, merchantDocumentFailure, merchantDocumentStart, merchantDomainFailure, merchantDomainStart, merchantFailure, merchantProfileFailure, merchantProfileStart, merchantStart } from "../../redux/slices/merchantSlice";

class MerchantService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }

    // merchant document
  
    async fetchMercahntDocumentTypes(dispatch) {
        dispatch(merchantDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/MerchantDocuments/document-types',
        );
        console.log('merchant document fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDocumentFailure('No response from server'));
        } else {
            dispatch(merchantDocumentFailure('Failed to fetch merchant data. Try again.'));
        }
      } finally {
      }
    }
  
    async createMerchantDocument(merchantCode, documentId, data, dispatch) {
        dispatch(merchantDocumentStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/MerchantDocuments/${merchantCode}/document-type/${documentId}`,
          JSON.stringify({data})
        );
        console.log('Merchant document created ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDocumentFailure('No response from server'));
        } else {
            dispatch(merchantDocumentFailure('Failed to create merchant document. Try again.'));
        }
      } finally {
      }
    }
  
    async createMerchantDocumentType2(merchantCode, documentId, data, dispatch) {
        dispatch(merchantDocumentStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/MerchantDocuments/${merchantCode}/document-type_2/${documentId}`,
          JSON.stringify({data})
        );
        console.log('Merchant document type 2 created ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDocumentFailure('No response from server'));
        } else {
            dispatch(merchantDocumentFailure('Failed to create merchant document. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMercahntDocument(merchantCode, dispatch) {
        dispatch(merchantDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantDocuments/${merchantCode}`,
        );
        console.log('merchant document fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDocumentFailure('No response from server'));
        } else {
            dispatch(merchantDocumentFailure('Failed to fetch merchant data. Try again.'));
        }
      } finally {
      }
    }
  
    async downloadMercahntDocument(Id, dispatch) {
        dispatch(merchantDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantDocuments/download/${Id}`,
        );
        console.log('merchant document fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDocumentFailure('No response from server'));
        } else {
            dispatch(merchantDocumentFailure('Failed to fetch merchant data. Try again.'));
        }
      } finally {
      }
    }
  
    async deleteMerchant(merchantCode, documentId, dispatch) {
        dispatch(merchantDocumentStart());
      try {
        const response = await this.axiosPrivate.delete(
          `api/MerchantDocuments/${documentId}`
        );
        console.log('Merchant document deleted sucessfully: ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDocumentFailure('No response from server'));
        } else {
            dispatch(merchantDocumentFailure('Failed to delete Merchant document. Try again.'));
        }
      } finally {
      }
    }

    // merchant
  
    async fetchMercahntDetails(merchantCode, dispatch) {
        dispatch(merchantStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Merchant/credentials/${merchantCode}`
        );
        console.log('merchant credential fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantFailure('No response from server'));
        } else {
            dispatch(merchantFailure('Failed to fetch merchant data. Try again.'));
        }
      } finally {
      }
    }
  
    async createMerchant(data, dispatch) {
        dispatch(merchantStart());
      try {
        const response = await this.axiosPrivate.post(
          'api/Merchant',
          JSON.stringify({data})
        );
        console.log('merchant credential created successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantFailure('No response from server'));
        } else {
            dispatch(merchantFailure('Failed to create merchant. Try again.'));
        }
      } finally {
      }
    }
  
    async addUserMerchant(data, dispatch) {
        dispatch(merchantStart());
      try {
        const response = await this.axiosPrivate.post(
          'api/Merchant/adduser',
          JSON.stringify({data})
        );
        console.log('merchant created successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantFailure('No response from server'));
        } else {
            dispatch(merchantFailure('Failed to create merchant user. Try again.'));
        }
      } finally {
      }
    }
  
    async searchMerchantAggregator(data, aggregatorCode, dispatch) {
        dispatch(merchantStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/Merchant/search/${aggregatorCode}`,
          JSON.stringify({data})
        );
        console.log('merchant credential created successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantFailure('No response from server'));
        } else {
            dispatch(merchantFailure('Failed to create merchant. Try again.'));
        }
      } finally {
      }
    }
  
    async deleteMerchantUser(data, dispatch) {
        dispatch(merchantStart());
      try {
        const response = await this.axiosPrivate.delete(
          'api/Merchant/user',
          JSON.stringify({data})
        );
        console.log('merchant deleted successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantFailure('No response from server'));
        } else {
            dispatch(merchantFailure('Failed to delete merchant. Try again.'));
        }
      } finally {
      }
    }
  
    async deleteMerchant(merchantId, dispatch) {
        dispatch(merchantStart());
      try {
        const response = await this.axiosPrivate.delete(
          `api/Merchant/${merchantId}`
        );
        console.log('merchant deleted successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantFailure('No response from server'));
        } else {
            dispatch(merchantFailure('Failed to delete merchant. Try again.'));
        }
      } finally {
      }
    }

    // merchant account
  
    async createMerchantAccount(merchantCode, data, dispatch) {
        dispatch(merchantAccountStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/MerchantAccount/${merchantCode}`,
          JSON.stringify({data})
        );
        console.log('merchant account created successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAccountFailure('No response from server'));
        } else {
            dispatch(merchantAccountFailure('Failed to create merchant account. Try again.'));
        }
      } finally {
      }
    }
  
    async updateMerchantAccount(Id, dispatch) {
        dispatch(merchantAccountStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/MerchantAccount/${Id}`
        );
        console.log('merchant Account updated successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAccountFailure('No response from server'));
        } else {
            dispatch(merchantAccountFailure('Failed to update merchant account. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantAccount(Id, dispatch) {
        dispatch(merchantAccountStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantAccount/${Id}`
        );
        console.log('merchant Account fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAccountFailure('No response from server'));
        } else {
            dispatch(merchantAccountFailure('Failed to fetch merchant account. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantAccountByAccountNumber(accountNumber, dispatch) {
        dispatch(merchantAccountStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantAccount/${accountNumber}`
        );
        console.log('merchant Account fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAccountFailure('No response from server'));
        } else {
            dispatch(merchantAccountFailure('Failed to fetch merchant account. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantAccountByPage(merchantCode, pageNumber, pageSize, dispatch) {
        dispatch(merchantAccountStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantAccount/${merchantCode}?pageNumber=${pageNumber}&pageSize=${pageSize}`
        );
        console.log('merchant Account fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAccountFailure('No response from server'));
        } else {
            dispatch(merchantAccountFailure('Failed to fetch merchant account. Try again.'));
        }
      } finally {
      }
    }
  
    async setMerchantAccountAsDefault(id, dispatch) {
        dispatch(merchantAccountStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantAccount/setasdefault/${id}`
        );
        console.log('merchant Account set as default successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAccountFailure('No response from server'));
        } else {
            dispatch(merchantAccountFailure('Failed to set merchant account as default. Try again.'));
        }
      } finally {
      }
    }

    // merchant address
  
    async fetchMerchantAddress(merchantCode, dispatch) {
        dispatch(merchantAddressStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantAddress/${merchantCode}`
        );
        console.log('merchant address fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAddressFailure('No response from server'));
        } else {
            dispatch(merchantAddressFailure('Failed to fetch merchant address. Try again.'));
        }
      } finally {
      }
    }
  
    async updateMerchantAddress(merchantCode, data, dispatch) {
        dispatch(merchantAddressStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/MerchantAddress/${merchantCode}`,
          JSON.stringify({data})
        );
        console.log('merchant address updated successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantAddressFailure('No response from server'));
        } else {
            dispatch(merchantAddressFailure('Failed to update merchant address. Try again.'));
        }
      } finally {
      }
    }

    // merchant contact
  
    async fetchMerchantContact(merchantCode, dispatch) {
        dispatch(merchantContactStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantContact/${merchantCode}`
        );
        console.log('merchant Contact fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantContactFailure('No response from server'));
        } else {
            dispatch(merchantContactFailure('Failed to fetch merchant contact. Try again.'));
        }
      } finally {
      }
    }
  
    async updateMerchantContact(merchantCode, data, dispatch) {
        dispatch(merchantContactStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/MerchantContact/${merchantCode}`,
          JSON.stringify({data})
        );
        console.log('merchant contact updated successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantContactFailure('No response from server'));
        } else {
            dispatch(merchantContactFailure('Failed to update merchant Contact. Try again.'));
        }
      } finally {
      }
    }

    // merchant domain
  
    async createMerchantDomain(merchantCode, dispatch) {
        dispatch(merchantDomainStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/MerchantDomain/${merchantCode}`
        );
        console.log('merchant Domain created successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDomainFailure('No response from server'));
        } else {
            dispatch(merchantDomainFailure('Failed to create merchant domain. Try again.'));
        }
      } finally {
      }
    }
  
    async updateMerchantDomain(id, data, dispatch) {
        dispatch(merchantDomainStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/MerchantDomain/${id}`,
          JSON.stringify({data})
        );
        console.log('merchant domain updated successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDomainFailure('No response from server'));
        } else {
            dispatch(merchantDomainFailure('Failed to update merchant donin. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantDomainById(id, dispatch) {
        dispatch(merchantDomainStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantDomain/${id}`
        );
        console.log('merchant Domain fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDomainFailure('No response from server'));
        } else {
            dispatch(merchantDomainFailure('Failed to fetch merchant Domain. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantDomain(merchantCode, dispatch) {
        dispatch(merchantDomainStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantDomain/all/${merchantCode}`
        );
        console.log('merchant domain fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantDomainFailure('No response from server'));
        } else {
            dispatch(merchantDomainFailure('Failed to fetch merchant Domain. Try again.'));
        }
      } finally {
      }
    }

    // merchant profile
  
    async fetchMerchantProfileBusinessType(dispatch) {
        dispatch(merchantProfileStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantProfile/business-type`
        );
        console.log('merchant profile business type fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantProfileFailure('No response from server'));
        } else {
            dispatch(merchantProfileFailure('Failed to fetch merchant profile business type. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantProfileRegistrationType(dispatch) {
        dispatch(merchantProfileStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/MerchantProfile/registration-type'
        );
        console.log('merchant profile registration type fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantProfileFailure('No response from server'));
        } else {
            dispatch(merchantProfileFailure('Failed to fetch merchant registration business type. Try again.'));
        }
      } finally {
      }
    }
  
    async updateMerchantProfile(merchantCode, data, dispatch) {
        dispatch(merchantProfileStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/MerchantProfile/${merchantCode}`,
          JSON.stringify({data})
        );
        console.log('merchant Profile updated successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantProfileFailure('No response from server'));
        } else {
            dispatch(merchantProfileFailure('Failed to update merchant profile. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchMerchantProfile(merchantCode, dispatch) {
        dispatch(merchantProfileStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/MerchantProfile/${merchantCode}`
        );
        console.log('merchant profile fetched successfully ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(merchantProfileFailure('No response from server'));
        } else {
            dispatch(merchantProfileFailure('Failed to fetch merchant profile. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default MerchantService;