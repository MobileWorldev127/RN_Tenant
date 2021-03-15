import { GET, POST, PATCH } from '@src/api/constants';
import api from '@src/api/api';
import auth from '@src/api/auth';
import properties from '@src/api/properties';

const VOUCHERS_URL = 'contacts/{contactId}/properties/{propertyId}/tenancies/{tenancyId}/vouchers';

const vouchers = {
	async getVouchers() {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();
		const tenancyId = await properties.getTenancyId();

		return api
			.request(
				GET,
				VOUCHERS_URL.replace('{contactId}', contactId).replace('{propertyId}', propertyId).replace('{tenancyId}', tenancyId)
			)
			.then(res => {
				return res;
			});
	}
};

export default vouchers;
