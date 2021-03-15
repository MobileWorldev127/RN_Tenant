import { SERVER_URL } from '@env';
import auth from '@src/api/auth';
import navigation from '@src/api/navigation';
import network from '@src/api/network';
import { Routes } from '@src/navigation/screenNames';

const api = {
	async getHeaders(type) {
		return {
			Accept: 'application/json',
			'X-Auth-Token': await auth.getAccessToken(),
			'Content-Type': type,
			'X-Forwarded-For': network.getIpAddress()
		};
	},

	async request(method, url, params) {
		try {
			let response = await fetch(SERVER_URL + url, {
				method: method,
				headers: await this.getHeaders('application/json'),
				body: JSON.stringify(params)
			});
			// If token is invalid, redirect to login screen
			if (response.status === 401) {
				await auth.resetAccessToken();
				if (navigation.getCurrentRoute().routeName !== Routes.AUTH_NAVIGATOR) {
					navigation.navigate(Routes.LOGIN);
				}
			} else {
				let responseJson = await getResponse(response);
				return responseJson;
			}
		} catch (error) {
			console.error(error);
		}
	},

	async requestData(method, url, data) {
		try {
			let response = await fetch(SERVER_URL + url, {
				method: method,
				headers: await this.getHeaders('multipart/form-data'),
				body: data
			});

			let responseJson = await getResponse(response);
			responseJson.status = response.status;
			return responseJson;
		} catch (error) {
			throw error;
		}
	}
};

/**
 * Returns the body text to avoid erros with the empty objects.
 * @param {*} response
 */
function getResponse(response) {
	return !!response._bodyText ? response.json() : { response: '' };
}

export default api;
