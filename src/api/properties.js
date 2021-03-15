import { GET } from '@src/api/constants';
import api from '@src/api/api';
import storage from '@src/api/storage';
import { PROPERTY_STORAGE_ID } from '@src/api/constants';

const PROPERTIES_URL = 'contacts/{contactId}/properties';
const PROPERTY_URL = 'contacts/{contactId}/properties/{propertyId}';

const TENANT_RELATIONSHIP = 'TEN';

const properties = {
	async getProperties(contactId) {
		return api.request(GET, PROPERTIES_URL.replace('{contactId}', contactId)).then(res => {
			return  filterProperties(res);
		});
	},
	async setProperty(property) {
		storage.save(PROPERTY_STORAGE_ID, property);
	},
	async getProperty() {
		return await storage.get(PROPERTY_STORAGE_ID);
	},
	async getPropertyId() {
		const property = await properties.getProperty();
		return property ? property.property_id : null;
	},
	async getTenancy() {
		const property = await properties.getProperty();
		return property && !!property.tenancies[0] ? property.tenancies[0].tenancy : null;
	},
	async getTenancyId() {
		const tenancy = await properties.getTenancy();
		return tenancy ? tenancy.tenancy_id : null;
	},
	async isManaged() {
		const property = await properties.getProperty();
		return property.tenancies[0].is_managed;
	}
};


/**
 * Removes property tenancies that do not belong to a tenant or are archived
 * If the property has no tenancies it filters it out
 */
const filterProperties = (properties) => {

	// Filters out properites that have no tenancies belonging to a tenant
	return properties.filter(property => {
		// Filter out tenancies that don't belong to a tenant or that are archived
		property.tenancies = filterTenancies(property);

		// Sort tenancies according to their end date
		sortTenancies(property.tenancies);

		return property.tenancies.length > 0
	})
}

// Filters out tenancies that don't belong to a tenant or that are archived
const filterTenancies = (property) => property.tenancies.filter(tenancy => {
	return tenancy.relationship_type === TENANT_RELATIONSHIP && isNotArchived(tenancy)
})



// Returns true if the tenancy is not archived
isNotArchived = (tenancy) => {
		const archivedStatuses = ['TTV', 'COM', 'CLO', 'CAN', 'TFT']

		return archivedStatuses.indexOf(tenancy.tenancy.tenancy_status) === -1
}

const sortTenancies = (tenancies) => {
	tenancies.sort((tenancyA, tenancyB) =>
		new Date(tenancyB.tenancy.tenancy_end_date) > new Date(tenancyA.tenancy.tenancy_start_date))
}



export default properties;
