import { GET } from '@src/api/constants';
import api from '@src/api/api';
import storage from '@src/api/storage';

const OFFERS_URL = 'contacts/{contactId}/offers/lettings/{dealId}';

const offers = {
	async getOffer(contactId, tenantId) {
		return api
			.request(GET, OFFERS_URL.replace('{contactId}', contactId).replace('{dealId}', tenantId))
			.then(res => {
				return res;
			});
	},
};

export default offers;
