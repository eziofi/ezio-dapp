import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const httpClient = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : undefined,
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000, // request timeout
});

const requestOnFulfilled = (config: AxiosRequestConfig) => {
  return config;
};

const requestOnRejected = (error: AxiosError) => {
  console.error(error);
  return Promise.reject(error);
};

const responseOnFulfilled = (response: AxiosResponse) => {
  return response;
};

const responseOnRejected = (error: AxiosError) => {
  return Promise.reject(error);
};

httpClient.interceptors.request.use(requestOnFulfilled, requestOnRejected);
httpClient.interceptors.response.use(responseOnFulfilled, responseOnRejected);

export default httpClient;
