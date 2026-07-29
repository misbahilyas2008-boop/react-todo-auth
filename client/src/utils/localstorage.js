export const setAccessToken = async value => {
    try {
      return await localStorage.setItem('access_token', value);
    } catch (e) {
      return null;
    }
  };
  
  export const getAccessToken = async () => {
    try {
      const value = await localStorage.getItem('access_token');
  
      return value;
    } catch (e) {
      return null;
    }
  };
  
  export const getRememberME = async () => {
    try {
      const value = await localStorage.getItem('remember_me');
  
      return value;
    } catch (e) {
      return null;
    }
  };
  
  export const removeAccessToken = async () => {
    try {
      return await localStorage.removeItem('access_token');
    } catch (e) {
      return null;
    }
  };
  
  export const setRememberME = async value => {
    try {
      return await localStorage.setItem('remember_me', value);
    } catch (e) {
      return null;
    }
  };
  
  export const removeRememberME = async () => {
    await localStorage.removeItem('remember_me');
  };