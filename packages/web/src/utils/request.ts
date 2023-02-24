import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return err;
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err.response?.data || "error");
  }
);

const requset = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const res = await instance.request(config);
  return res.data;
};

export default requset;
