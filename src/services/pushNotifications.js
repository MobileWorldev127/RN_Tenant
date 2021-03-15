import PushNotification from 'react-native-push-notification-ce';
import DeviceInfo from 'react-native-device-info';
import contacts from '@src/api/contacts';
import { PushNotificationIOS } from 'react-native';

export const configure = () => PushNotification.configure({

	// (optional) Called when Token is generated (iOS and Android)
	onRegister: function(data) {
		console.log( 'TOKEN:', data );
		contacts.registerPushToken(data.os, DeviceInfo.getUniqueId(), data.token)
	},

	// (required) Called when a remote or local notification is opened or received
	onNotification: function(notification) {
		console.warn( 'NOTIFICATION:', notification );

		// Update badge number when notification is received
		PushNotification.setApplicationIconBadgeNumber(notification.badge || 0);

		// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},

	// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
	senderID: "599720960435",

	// IOS ONLY (optional): default: all - Permissions to register.
	permissions: {
		alert: true,
		badge: true,
		sound: true
	},

	// Should the initial notification be popped automatically
	// default: true
	popInitialNotification: true,

	/**
	* (optional) default: true
	* - Specified if permissions (ios) and token (android and ios) will requested or not,
	* - if not, you must call PushNotificationsHandler.requestPermissions() later
	*/
	requestPermissions: true,
});
