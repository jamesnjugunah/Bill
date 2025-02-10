import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
});


const registerUser = async (email, phone, password, confirmPassword) => {

    try {
        const response = await axios.post('/api/register', { email, phone, password, confirmPassword });
        alert(response.data.message);
        window.location.href = response.data.redirect;
    } catch (error) {
        alert(error.response?.data?.error || "Registration failed");
    }
}

//handling login page
const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        alert(response.data.message);
        window.location.href = response.data.redirect;
    } catch (error) {
        alert(error.response?.data?.error || "Login failed");
    }
}