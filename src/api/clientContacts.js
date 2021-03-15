import { GET } from '@src/api/constants';
import api from '@src/api/api';
import properties from '@src/api/properties';

const CLIENTCONTACTS_URL = 'contacts/{contactId}/contacts?tenancyId={tenancyId}';

const clientContacts = {
	async getClientContacts(contactId) {
		const tenancyId = await properties.getTenancyId();

		return api
			.request(GET, CLIENTCONTACTS_URL
				.replace('{contactId}', contactId)
				.replace('{tenancyId}', tenancyId))
			.then(res => {
				return res;
		});
	},
};

export default clientContacts;
