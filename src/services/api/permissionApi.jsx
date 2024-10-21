import { invoiceFailure, invoiceStart } from "../../redux/slices/invoiceSlice";

class PermissionService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }

    // permissions
  
    async fetchPermission() {
      try {
        const response = await this.axiosPrivate.get(
          'api/Permissions'
        );
        console.log('This is the permission data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }

    // role permission
  
    async fetchRolePermission(roleId, aggregatorCode) {
      try {
        const response = await this.axiosPrivate.get(
          `api/RolePermission/${roleId}/permissions/${aggregatorCode}`
        );
        console.log('This is the role permission data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchAggregatorRolePermission(roleId, aggregatorCode, pageSize, pageNumber) {
      try {
        const response = await this.axiosPrivate.get(
          `api/RolePermission/${roleId}/permissions/${aggregatorCode}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        console.log('This is the aggregator role permission data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }
  
    async createRolePermission(merchantCode, data) {
      try {
        const response = await this.axiosPrivate.post(
          `api/RolePermission/${merchantCode}`,
          JSON.stringify({data})
        );
        console.log('merchant permission data created ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }
  
    async updateAggregatorRolePermission(id, aggregatorCode, data) {
      try {
        const response = await this.axiosPrivate.put(
          `api/RolePermission/${id}/permissions/${aggregatorCode}`,
          JSON.stringify({data})
        );
        console.log('aggregator role permission updated ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }
  
    async activateeAggregatorRolePermission(id, aggregatorCode) {
      try {
        const response = await this.axiosPrivate.put(
          `api/RolePermission/activate/${id}/permissions/${aggregatorCode}`
        );
        console.log('aggregator role permission activated ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }
  
    async deactivateeAggregatorRolePermission(id, aggregatorCode) {
      try {
        const response = await this.axiosPrivate.put(
          `api/RolePermission/deactivate/${id}/permissions/${aggregatorCode}`
        );
        console.log('aggregator role permission deactivated ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchUserRolePermission(aggregatorCode) {
      try {
        const response = await this.axiosPrivate.get(
          `api/RolePermission/user/${aggregatorCode}`
        );
        console.log('user role permission fetched ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            // dispatch(invoiceFailure('No response from server'));
        } else {
            // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
        }
      } finally {
      }
    }

    // roles
  
    async fetchUserRole( aggregatorCode) {
        try {
          const response = await this.axiosPrivate.get(
            `api/Roles/user/${aggregatorCode}`
          );
          console.log('This is the user role data ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }
    
      async fetchUserRoleById(userId, aggregatorCode, merchantCode) {
        try {
          const response = await this.axiosPrivate.get(
            `api/Roles/user/${userId}/${merchantCode}?aggregatorCode=${aggregatorCode}`
          );
          console.log('This is the user role data ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }
    
      async createRole(aggregatorCode, data) {
        try {
          const response = await this.axiosPrivate.post(
            `api/Roles/${aggregatorCode}`,
            JSON.stringify({data})
          );
          console.log('role created ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }
    
      async updateAggregatorRolePermission(id, aggregatorCode, data) {
        try {
          const response = await this.axiosPrivate.put(
            `api/RolePermission/${id}/permissions/${aggregatorCode}`,
            JSON.stringify({data})
          );
          console.log('aggregator role permission updated ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }
    
      async activateeAggregatorRolePermission(id, aggregatorCode) {
        try {
          const response = await this.axiosPrivate.put(
            `api/RolePermission/activate/${id}/permissions/${aggregatorCode}`
          );
          console.log('aggregator role permission activated ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }
    
      async deactivateeAggregatorRolePermission(id, aggregatorCode) {
        try {
          const response = await this.axiosPrivate.put(
            `api/RolePermission/deactivate/${id}/permissions/${aggregatorCode}`
          );
          console.log('aggregator role permission deactivated ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }
    
      async fetchUserRolePermission(aggregatorCode) {
        try {
          const response = await this.axiosPrivate.get(
            `api/RolePermission/user/${aggregatorCode}`
          );
          console.log('user role permission fetched ', response.data);
          return response.data;
        } catch (err) {
          if (!err.response) {
              // dispatch(invoiceFailure('No response from server'));
          } else {
              // dispatch(invoiceFailure('Failed to load Customer permission. Try again.'));
          }
        } finally {
        }
      }

  }
  
  export default PermissionService;