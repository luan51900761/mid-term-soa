import axios from 'axios';
import jwt_decode from 'jwt-decode';

// refreshTokens
const refreshToken = async () => {
	try {
		console.log('let go');
		// withCredentials
		const res = await axios.post(
			'http://localhost:3000/v1/api/auth/refreshToken',
			{},
			{
				withCredentials: true,
			}
		);
		console.log('res', res);
		return res.data;
	} catch (err) {
		console.log('Hihi ', err);
	}
};

export const createAxios = (user, dispatch, stateSuccess) => {
	const newInstance = axios.create();
	// withCredentials
	newInstance.defaults.withCredentials = true;
	let refreshUser = {};
	newInstance.interceptors.request.use(
		async config => {
			let date = new Date();
			const decodedToken = jwt_decode(user?.token);

			if (decodedToken.exp < date.getTime() / 1000) {
				const data = await refreshToken();
				console.log('data111111', data);
				const refreshUser = {
					...user,
					token: data.token,
				};
				// console.log("refreshUser", refreshUser);
				dispatch(stateSuccess(refreshUser));
				config.headers['authorization'] = 'Bearer ' + data.token;
			} else {
				dispatch(stateSuccess(refreshUser));
			}

			return config;
		},
		err => {
			return Promise.reject(err);
		}
	);
	return newInstance;
};
