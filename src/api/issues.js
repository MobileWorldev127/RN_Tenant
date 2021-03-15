import { GET, POST, PATCH } from '@src/api/constants';
import { Alert } from 'react-native';
import api from '@src/api/api';
import auth from '@src/api/auth';
import properties from '@src/api/properties';
import { issues_statuses, update_types } from '@src/features/issues/constants/issuesStatuses';
import screens from '@src/api/screens';
import { Routes } from '@src/navigation/screenNames';

const ISSUES_URL = 'contacts/{contactId}/properties/{propertyId}/issues';
const ISSUE_URL = 'contacts/{contactId}/properties/{propertyId}/issues/{issueId}';
const ISSUE_UPDATE_URL = 'contacts/{contactId}/properties/{propertyId}/issues/{issueId}/updates';
const ISSUE_UPLOAD_URL = 'media/files';
const FILE_ASSET_TYPE = 'TENANCY_ISSUE';
import {
	HTTP_CODE_TRUE_SUCCESS,
	HTTP_CODE_FILE_UPLOAD_ERROR,
	HTTP_CODE_FILE_UPLOAD_ERROR_WHOLE
} from '@src/api/constants';

const issues = {
	async create(params) {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();

		const issue = {
			created_datetime: new Date(),
			tenancy_id: await properties.getTenancyId(),
			issue_type: params.type,
			issue_category: params.category,
			title: params.title,
			description: params.description
		};

		return api
			.request(
				POST,
				ISSUES_URL.replace('{contactId}', contactId).replace('{propertyId}', propertyId),
				issue
			)
			.then(res => {
				// Refresh open issues on home screen
				if (!!screens.getReference(Routes.HOME)) {
					screens.getReference(Routes.HOME).refreshIssueCount();
				}
				return res;
			});
	},

	/**
	 *	Update issue with attachments
	 *
	 * @param {*} issueId - Issue ID
	 * @param {*} params - Issue params. Mandatory attributes: type (TENANT_COMMENT), description
	 * @param {*} attachment - File object array. Object's mandatory attributes: uri, name
	 *
	 * @return {*} { updateId: Issue Update ID, attachment: uploaded files }
	 */
	async update(issueId, params, attachment, callback) {
		let success = true;
		let uploaded = [];
		const update = await this.updateIssue(issueId, params);

		// Upload files
		for (let file of attachment) {
			const uploadedSuccess = await this.uploadFile(
				issueId,
				update.issue_update_id,
				file,
				callback
			);
			if (uploadedSuccess) {
				uploaded.push(file);
			} else {
				success = false;
			}
		}

		// Alert when one or more upload wasn't successsul
		if (!success) {
			return false;
		}

		return {
			updateId: update.issue_update_id,
			attachment: uploaded
		};
	},

	/**
	 *	Update issue
	 *
	 * @param {*} issueId - Issue ID
	 * @param {*} params - Issue params. Mandatory attributes: type (TENANT_COMMENT), description
	 */
	async updateIssue(issueId, params) {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();

		const issue = {
			created_datetime: new Date(),
			issue_update_id: issueId,
			update_type: params.type,
			description: params.description
		};

		return api
			.request(
				POST,
				ISSUE_UPDATE_URL.replace('{contactId}', contactId)
					.replace('{propertyId}', propertyId)
					.replace('{issueId}', issueId),
				issue
			)
			.then(res => {
				// Refresh open issues on home screen
				if (!!screens.getReference(Routes.HOME)) {
					screens.getReference(Routes.HOME).refreshIssueCount();
				}
				return res;
			});
	},

	/**
	 * Upload attachments
	 *
	 * @param {*} issueId - Issue ID
	 * @param {*} updateId - Issue Update ID (optional)
	 * @param {*} file - File object. Mandatory attributes: uri, name
	 * @param {*} catchError - Handle error and send alert
	 */
	async uploadFile(issueId, updateId, file, callback) {
		const data = new FormData();
		const contactId = await auth.getContactId();
		const metadata = {
			contact_id: contactId,
			parent_entity_id: issueId,
			web_media_asset_type: FILE_ASSET_TYPE,
			mime_type: file.mime_type
		};

		if (updateId) metadata.child_entity_id = updateId;

		data.append('metadata', JSON.stringify(metadata));
		data.append('uploadFile', {
			uri: file.uri,
			type: file.mime_type,
			name: file.fileName,
			filename: file.fileName
		});

		try {
			const res = await api.requestData(POST, ISSUE_UPLOAD_URL, data);

			if (res.status) {
				if (res.status === HTTP_CODE_TRUE_SUCCESS) {
					callback && callback(true);
					return true;
				} else {
					if (
						res.status === HTTP_CODE_FILE_UPLOAD_ERROR ||
						res.status === HTTP_CODE_FILE_UPLOAD_ERROR_WHOLE
					) {
						this.showUploadError(
							'Upload error',
							'The file you are trying to upload appears to be too large. Please try a smaller file',
							callback
						);
					} else {
						this.showUploadError(
							'Upload error',
							'One or more uploads were unsuccessful. Please upload the missing files again.',
							callback
						);
					}
					return false;
				}
			} else {
				this.showUploadError(
					'Upload error',
					'One or more uploads were unsuccessful. Please upload the missing files again.',
					callback
				);
				return false;
			}
		} catch (e) {
			this.showUploadError(
				'Upload error',
				'One or more uploads were unsuccessful. Please upload the missing files again.',
				callback
			);
			return false;
		}
	},

	async getIssues() {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();
		const tenancyId = await properties.getTenancyId();

		return api
			.request(
				GET,
				ISSUES_URL.replace('{contactId}', contactId).replace('{propertyId}', propertyId) +
					'?tenancyId=' +
					tenancyId
			)
			.then(res => {
				return res;
			});
	},

	async getIssuesType() {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();
		const tenancyId = await properties.getTenancyId();

		return api
			.request(
				GET,
				ISSUES_URL.replace('{contactId}', contactId).replace('{propertyId}', propertyId) +
					'/types?tenancyId=' +
					tenancyId
			)
			.then(res => {
				return res;
			});
	},

	async getIssue(issueId) {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();

		return api
			.request(
				GET,
				ISSUE_URL.replace('{contactId}', contactId)
					.replace('{propertyId}', propertyId)
					.replace('{issueId}', issueId)
			)
			.then(res => {
				return res;
			});
	},

	async getOpenIssues() {
		const issues = await this.getIssues();
		return issues.filter(
			issue =>
				issue.issue_updates.length === 0 ||
				(issue.issue_updates[issue.issue_updates.length - 1].update_type !==
					update_types.CLOSE &&
					issue.status !== issues_statuses.RESOLVED &&
					issue.status !== issues_statuses.NO_ACTION)
		);
	},

	async close(issueId, params) {
		const contactId = await auth.getContactId();
		const propertyId = await properties.getPropertyId();

		const issue = {
			description: params.description,
			rating: params.rating
		};

		return api
			.request(
				PATCH,
				ISSUE_URL.replace('{contactId}', contactId)
					.replace('{propertyId}', propertyId)
					.replace('{issueId}', issueId),
				issue
			)
			.then(res => {
				// Refresh open issues on home screen
				if (!!screens.getReference(Routes.HOME)) {
					screens.getReference(Routes.HOME).refreshIssueCount();
				}
				return res;
			});
	},

	showUploadError(title = '', msg = '', callback) {
		Alert.alert(title, msg, [
			{
				text: 'Close',
				onPress: () => {
					callback && callback(false);
				}
			}
		]);
	}
};

export default issues;
