import { Routes } from '@src/navigation/screenNames';
import { HomeType } from '@src/features/home/homeTypes';
import icons from '@src/assets/icons';
import styles from '@src/components/shared/attachFile/styles';

export const SOURCETITLES = {
	CAMERA_PHOTO: 'Photo',
	CAMERA_VIDEO: 'Video',
	LIBRARY_PHOTO: 'Photo Library',
	LIBRARY_VIDEO: 'Video Library',
	DOCUMENT: 'Document'
};

export const SOURCES = [
	{
		title: SOURCETITLES.CAMERA_PHOTO,
		icon: {
			source: icons.camera,
			style: styles.cameraIcon,
			container: styles.iconContainer
		}
	},
	{
		title: SOURCETITLES.CAMERA_VIDEO,
		icon: {
			source: icons.camera,
			style: styles.cameraIcon,
			container: styles.iconContainer
		}
	},
	{
		title: SOURCETITLES.LIBRARY_PHOTO,
		icon: {
			source: icons.image,
			style: styles.imageIcon,
			container: styles.iconContainer
		}
	},
	{
		title: SOURCETITLES.LIBRARY_VIDEO,
		icon: {
			source: icons.image,
			style: styles.imageIcon,
			container: styles.iconContainer
		}
	},
	{
		title: SOURCETITLES.DOCUMENT,
		icon: {
			source: icons.document,
			style: styles.documentIcon,
			container: styles.iconContainer
		}
	}
];
