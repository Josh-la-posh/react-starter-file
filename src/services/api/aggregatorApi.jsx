import { aggregatorBankFailure, aggregatorBankStart, aggregatorDocumentFailure, aggregatorDocumentStart, aggregatorFailure, aggregatorMerchantFailure, aggregatorMerchantStart, aggregatorMerchantSuccess, aggregatorStart, aggregatorSuccess } from "../../redux/slices/aggregatorSlice";

class AggregatorService {
    constructor(axiosPrivate) {
      this.axiosPrivate = axiosPrivate;
    }

    // fetch aggregator
  
    async fetchAggregator(dispatch) {
        dispatch(aggregatorStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/Aggregator',
        );
        const data = response.data.responseData;
        console.log('This is the aggregator data ', response.data.responseData);
        dispatch(aggregatorSuccess(data));
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorFailure('No response from server'));
        } else {
            dispatch(aggregatorFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // fetch aggregator merchants
  
    async fetchAggregatorMerchants(dispatch) {
        dispatch(aggregatorMerchantStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/Aggregator/merchants',
        );
        const data = response.data.responseData;
        dispatch(aggregatorMerchantSuccess(data));
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorMerchantFailure('No response from server'));
        } else {
            dispatch(aggregatorMerchantFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // update aggregator
  
    async updateAggregator(dispatch, data) {
        dispatch(aggregatorStart());
      try {
        const response = await this.axiosPrivate.put(
          'api/Aggregator',
          JSON.stringify({data})
        );
        console.log('This is the aggregator data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorFailure('No response from server'));
        } else {
            dispatch(aggregatorFailure('Failed to load Customer data. Try again.'));
        }
      } finally {
      }
    }

    // aggregator bank

    // fetch aggregator bank
  
    async fetchAggregatorBank(dispatch) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/AggregatorBank',
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // fetch aggregator bank by id
  
    async fetchAggregatorBankById(dispatch, id) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/AggregatorBank/${id}`,
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // add aggregator bank
  
    async addAggregatorBankById(dispatch) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.post(
          'api/AggregatorBank',
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // update aggregator bank by id
  
    async updateAggregatorBankById(dispatch, id, data) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/${id}`,
          JSON.stringify({data})
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // deactivate aggregator bank
  
    async deactivateAggregatorBankById(dispatch, id) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/deactivate/${id}`
        );
        console.log('Deactivated bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to deactivate bank. Try again.'));
        }
      } finally {
      }
    }

    // activate aggregator bank
  
    async activateAggregatorBankById(dispatch, id) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/activate/${id}`
        );
        console.log('activated bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to activate bank. Try again.'));
        }
      } finally {
      }
    }

    // set aggregator bank as primary account
  
    async setAggregatorBankAsPrimary(data, dispatch, id) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/set-primary-account/${id}`,
          JSON.stringify({data})
        );
        console.log('set bank as primary: ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to set as primary account. Try again.'));
        }
      } finally {
      }
    }


    // aggregator documents

    // fetch aggregator document type
  
    async fetchAggregatorDocumentTypes(dispatch) {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/AggregatorDocuments/document-types',
        );
        console.log('This are the aggregator document types ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // fetch aggregator document
  
    async fetchAggregatorDocuments(dispatch) {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/AggregatorDocuments',
        );
        console.log('This are the aggregator documents ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // download aggregator document
  
    async downloadAggregatorDocuments(dispatch, id) {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/AggregatorDocuments/download/${id}`,
        );
        console.log('This is the aggregator download ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to download data. Try again.'));
        }
      } finally {
      }
    }

    // post aggregator document
  
    async postAggregatorDocuments(dispatch, documentId, data) {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/AggregatorDocuments/document/${documentId}`,
          JSON.stringify({data})
        );
        console.log('Uploading aggregator download ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to download data. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default AggregatorService;