import { API_URL } from '../config';

export const signIn = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}authentication/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    localStorage.setItem('userToken', data.token);
    return { email, access_token: data.token, message: 'Successfully logged' };
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const register = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await fetch(`${API_URL}authentication/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('userToken', data.token);
    }
    return {
      data,
      message: 'Successfully register!',
    };
  } catch (error) {
    throw new Error('Error to register user');
  }
};
