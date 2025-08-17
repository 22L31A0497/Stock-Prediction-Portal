import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type':'application/json',
    }
})

//Request interceptor 

axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
         if(accessToken){
            config.headers['Authorization']=`Bearer ${accessToken}`
         }
        console.log(config);
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

//Response Interceptors

axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    async function (error){
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try{
            const response =  await axiosInstance.post('/token/refresh/',{refresh:refreshToken})
            console.log('New Access Token ==>',response.data.access)
            localStorage.setItem('accessToken',response.data.access)
            originalRequest.headers['Authorization']=`Bearer ${response.data.access}`
            return axiosInstance(originalRequest)
              }
            catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
    

            }
            // Optionally, handle token refresh logic here
        }
        return Promise.reject(error);

    }
);


export default axiosInstance

