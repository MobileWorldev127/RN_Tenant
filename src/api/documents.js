import { SERVER_URL } from '@env';
import { GET } from '@src/api/constants';
import api from '@src/api/api';
import auth from '@src/api/auth';
import properties from '@src/api/properties';

const DOCUMENTS_URL = 'documents?contactId={contactId}&propertyId={propertyId}';
const DOCUMENT_URL = 'documents/{documentId}?contactId={contactId}';

const documents = {
	async getDocuments() {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();

		return api
			.request(
				GET,
				DOCUMENTS_URL.replace('{contactId}', contactId).replace('{propertyId}', propertyId)
			)
			.then(res => {
				const documents = res.filter(document => document.document_status === 'APP')
				return documents;
			});
	},
	async getDocumentLink(documentId) {
		const contactId = await auth.getContactId();

		return (
			SERVER_URL +
			DOCUMENT_URL.replace('{contactId}', contactId).replace('{documentId}', documentId)
		);
	}
};

export default documents;
