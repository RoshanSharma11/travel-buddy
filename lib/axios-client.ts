import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "@clerk/nextjs";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: "https://gpl-project.onrender.com/api/v1", 
  // baseURL: "http://127.0.0.1:8000/api/v1", 
  // timeout: 10000, 
});

export const useAxiosClient = () => {
  const { getToken } = useAuth();

  axiosClient.interceptors.request.use(
    async (config: any) => {
      try {
        const token = await getToken();
        // console.log(token);
        
        
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      } catch (error) {
        console.error("Error fetching Clerk auth token:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosClient;
};

export default axiosClient;
