import { GET, POST, DELETE } from '@src/api/constants';
import api from '@src/api/api';
import storage from '@src/api/storage';
import { CONTACT_STORAGE_ID } from '@src/api/constants';

const CONTACTS_URL = 'contacts/{id}';
const PUSH_TOKEN_URL = CONTACTS_URL + '/push_notifications';

const contacts = {
	async getContactById(id) {
		return api.request(GET, CONTACTS_URL.replace('{id}', id)).then(res => {
			storage.save(CONTACT_STORAGE_ID, res);
			return res;
		});
	},
	async getContact() {
		return storage.get(CONTACT_STORAGE_ID);
	},
	async getContactId() {
		const contact = await contacts.getContact();
		return contact ? contact.contact_id : null;
	},
	async registerPushToken(os, deviceId, token) {
		const id = await this.getContactId();
		if (!id) {
			console.warn('no contact id');
			return;
		}
		let registerBody = {
			platform_application: os === 'ios' ? 'TENANT_PORTAL_APNS' : 'TENANT_PORTAL_GCM',
			device_id: deviceId,
			token: token
		};

		const res = await api.request(POST, PUSH_TOKEN_URL.replace('{id}', id), registerBody);
	},
	async deleteApplicationEndpoint(os, deviceId) {
		const url = PUSH_TOKEN_URL + '/{deviceId}/applications/{platformApplication}';

		const id = await this.getContactId();
		if (!id) {
			console.warn('no contact id');
			return;
		}

		const platformApplication = os === 'ios' ? 'TENANT_PORTAL_APNS' : 'TENANT_PORTAL_GCM';

		const res = await api.request(
			DELETE,
			url
				.replace('{id}', id)
				.replace('{deviceId}', deviceId)
				.replace('{platformApplication}', platformApplication)
		);
	}
};

export default contacts;
