import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://mock.apifox.cn/m1/1721731-0-default",
  timeout: 10000,
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
    const { data } = res;
    return data;
  },
  (err) => Promise.reject(err.response?.data || "error")
);

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const res = await instance.request<T>(config);
  return res.data;
};

export default request;
