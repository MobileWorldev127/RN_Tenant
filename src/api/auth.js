import { POST } from '@src/api/constants';
import api from '@src/api/api';
import storage from '@src/api/storage';
import { AUTH_STORAGE_ID } from '@src/api/constants';

const AUTH_URL = 'auth/';

var requestTimer;

const auth = {
	async login(params) {
		const url = AUTH_URL + 'login';
		const res = await this.requestTimeout(10000, api.request(POST, url, params));
		if (res) {
			storage.save(AUTH_STORAGE_ID, res);
			return res;
		}
	},
	async getAuthInfo() {
		return await storage.get(AUTH_STORAGE_ID);
	},

	async getContactId() {
		const authInfo = await auth.getAuthInfo();
		return authInfo ? authInfo.contact_id : null;
	},

	async getAccessToken() {
		const authInfo = await auth.getAuthInfo();
		return authInfo ? authInfo.access_token : null;
	},

	async getUserName() {
		const authInfo = await auth.getAuthInfo();
		return authInfo ? authInfo.web_username : null;
	},

	async resetAccessToken() {
		await storage.remove(AUTH_STORAGE_ID);
	},

	async hasValidToken() {
		return !!(await this.getAuthInfo());
	},

	async forgottenPassword(params) {
		const url = AUTH_URL + 'forgot_password?webUsername=' + params.webUsername;
		return api.request(POST, url).then(res => {
			return res;
		});
	},

	/**
	 * Start request after x seconds
	 */
	requestTimeout(ms, promise) {
		return new Promise((resolve, reject) => {
			if (requestTimer != null) clearTimeout(requestTimer);

			requestTimer = setTimeout(() => {
				var e = new Error('No response from server, please try again');
				reject(e);
			}, ms);
			promise.then(resolve, reject);
		});
	}
};

export default auth;
