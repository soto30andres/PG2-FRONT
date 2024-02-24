import {API_URL} from '../config'


export const signIn = async ({ email, password }) => {

try {
    const response = await fetch(`${API_URL}authentication/signin`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    const data = await response.json()
    localStorage.setItem('userToken', data.token)
    return{email, access_token : data.token, message: "Sucessfully logged"}
  } catch (error) {
    throw new Error("Invalid credentials")
  }
}