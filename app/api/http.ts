import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://192.168.43.239:8080",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    console.log(`send a request - ${config.method} - ${config.url}`);
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
  (err) => Promise.reject(err.response?.data || "error")
);

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const res = await instance.request<T>(config);
  return res.data;
};

export default request;
