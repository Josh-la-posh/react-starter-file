import { invoiceFailure, invoiceStart } from "../../redux/slices/invoiceSlice";

class RoleService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }

    // roles
  
    async fetchRolesByAggregatorCode(aggregatorCode) {
      try {
        const response = await this.axiosPrivate.get(
          `api/Roles/user/${aggregatorCode}`
        );
        console.log('This is the role of the user ', response.data);
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
  
    async fetchRolesByUserId(userId, merchantCode, aggregatorCode) {
      try {
        const response = await this.axiosPrivate.get(
          `api/Roles/user/${userId}/${merchantCode}?aggregatorCode=${aggregatorCode}`
        );
        console.log('This is the role of the user by userId ', response.data);
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
  
    async fetchRoles(aggregatorCode, merchantCode) {
      try {
        const response = await this.axiosPrivate.get(
          `api/Roles/user/${merchantCode}?aggregatorCode=${aggregatorCode}`
        );
        console.log('This is the role of the users ', response.data);
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
  
    async updateRolesById(id, aggregatorCode, data) {
      try {
        const response = await this.axiosPrivate.put(
          `api/Roles/${id}/${merchantCode}?aggregatorCode=${aggregatorCode}`,
          JSON.stringify({data})
        );
        console.log('roles updated ', response.data);
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
  
    async activateRole(id, aggregatorCode) {
      try {
        const response = await this.axiosPrivate.put(
          `api/Roles/${id}activate/${aggregatorCode}`
        );
        console.log('role activated ', response.data);
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
  
    async deactivateRole(id, aggregatorCode) {
      try {
        const response = await this.axiosPrivate.put(
          `api/Roles/${id}deactivate/${aggregatorCode}`
        );
        console.log('role deactivated ', response.data);
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
  
    async removeRole(roleId, userId) {
      try {
        const response = await this.axiosPrivate.put(
          `api/Roles/${roleId}/user/${userId}/remove`
        );
        console.log('role removed ', response.data);
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


    // user roles
  
    async fetchAllUserRoles(merchantCode, pageSize, pageNumber) {
        try {
          const response = await this.axiosPrivate.get(
            `api/UserRoles/all/${merchantCode}?pageSize=${pageSize}&pageNumber=${pageNumber}`
          );
          console.log('fetched all user roles ', response.data);
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
  
    async addUserRole(merchantCode, data) {
        try {
          const response = await this.axiosPrivate.post(
            `api/UserRoles/addrole/${merchantCode}`,
            JSON.stringify({data})
          );
          console.log('user role created ', response.data);
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
  
      async removeUserRole(userRoleId, merchantCode) {
        try {
          const response = await this.axiosPrivate.post(
            `api/UserRoles/removerole/${userRoleId}/merchant/${merchantCode}`,
          );
          console.log('user role removed ', response.data);
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
  
      async fetchUserRolesBytMerchantCode(merchantCode) {
          try {
            const response = await this.axiosPrivate.get(
              `api/UserRoles/${merchantCode}`
            );
            console.log('fetched user roles ', response.data);
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
  
  export default RoleService;