import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';


const registerUser = async (email, phone, password, confirmPassword) => {

    try {
        const response = await axios.post('/api/register', { email, phone, password, confirmPassword });
        alert(response.data.message);
        window.location.href = response.data.redirect;
    } catch (error) {
        alert(error.response?.data?.error || "Registration failed");
    }
}
