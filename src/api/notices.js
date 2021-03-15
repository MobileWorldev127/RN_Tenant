import { GET, POST, PATCH } from '@src/api/constants';
import api from '@src/api/api';
import auth from '@src/api/auth';

const NOTICES_URL = 'contacts/{contactId}/notices';

const notices = {
	async getNotices() {
		const contactId = await auth.getContactId();

		return api
			.request(
				GET,
				NOTICES_URL.replace('{contactId}', contactId)
			)
			.then(res => {
				return res;
			});
	}
};

export default notices;
