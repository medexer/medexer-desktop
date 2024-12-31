import axios, {AxiosError} from 'axios';
import { nprogress } from '@mantine/nprogress';
import {showNotification} from '@mantine/notifications';

export const appAxiosInstance = axios.create();

// Add a response interceptor
appAxiosInstance.interceptors.response.use(
	(response) =>
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		response,
	(error: AxiosError) => {
		const data = error.response?.data as any;

		if (error.response) {
			// console.error('AXIOS-ERROR :: ', data);

			nprogress.reset();

			showNotification({
				message: data.message,
				title: data.error,
				color: 'red',
			});
		} else if (error.request) {
		} else {
			showNotification({
				color: 'red',
				message: 'An error occurred while processing your request',
			});
		}
		// Return a rejected promise with the error
		return Promise.reject(error);
	}
);

appAxiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers['Authorization'] = JSON.parse(token);
		}
		config.headers['Access-Control-Allow-Origin'] = '*';
		config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
		config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
