import { GET } from '@src/api/constants';
import api from '@src/api/api';
import auth from '@src/api/auth';
import properties from '@src/api/properties';

const PROGRESS_URL = 'contacts/{contactId}/properties/{propertyId}/tenancies/{tenancyId}/move_in';

const progress = {
	async getProgress() {
		const [contactId, propertyId, tenancyId] = await Promise.all([
			auth.getContactId(),
			properties.getPropertyId(),
			properties.getTenancyId()
		]);

		return api
			.request(
				GET,
				PROGRESS_URL.replace('{contactId}', contactId)
					.replace('{propertyId}', propertyId)
					.replace('{tenancyId}', tenancyId)
			)
			.then(res => {
				return res;
			});
	}
};

export default progress;
