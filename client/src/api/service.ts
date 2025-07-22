import api from "./client";

export const authService={
    signIn: async (creds: {username:string,password:string})=>{
        const response = await api.post('/signin', creds);
        if(response.data.token){
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    },

    signUp: async(userData: {username:string,email:string,password:string})=>{
        const response = await api.post('signup', userData);
        if(response.data.token){
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    },
    signOut: () => {
        localStorage.removeItem('authToken');
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

export const memeService = {
    getAllMemes: async () => {
      const response = await api.get('/api/market');
      return response.data;
    },
  
    getTrending: async () => {
      const response = await api.get('/api/trending');
      return response.data;
    },
  
    createMeme: async (memeData: {title:string,tags:string,imageUrl:string, startingPrice:number}) => {
      const response = await api.post('/api/create', memeData);
      return response.data;
    },
  
    likeMeme: async (memeId: string) => {
      const response = await api.post('/api/like', { memeId });
      return response.data;
    },
  
    getUserLikes: async () => {
      const response = await api.get('/api/user-likes');
      return response.data;
    },
  
    makeBid: async (bidData: any) => {
      const response = await api.post('/api/bid', bidData);
      return response.data;
    }
  };

export const handleAPIerror = (error:any)=>{
    if(error.response){
        return{
            message:error.response.data.error || error.response.data.message ||'An error occurred',
            status: error.response.status,
        };
    }else if(error.request){
        return {
            message: 'Network error. Please check your connection.',
            status: 0
        };
    }
    else {
        return {
          message: error.message || 'An unexpected error occurred',
          status: -1
        };
      }
};