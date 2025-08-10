import axios from "axios";

const baseURL = (import.meta as any).env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL,
    timeout: 60000,
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("authToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error)=>{
        return Promise.reject(error);   
    }
);

api.interceptors.response.use((response)=>{
    return response;
},
(error)=>{
    if(error.response?.status === 401){
        localStorage.removeItem('authToken');
        window.location.href= '/signin';
    }
   
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
}
);

export default api;