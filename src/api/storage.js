// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FOXTONS_STORE_ID } from '@src/api/constants';

const storage = {
	async save(id, item) {
		try {
			await AsyncStorage.setItem(FOXTONS_STORE_ID + id, JSON.stringify(item));
		} catch (error) {
			console.error(error);
		}
	},
	async get(id) {
		try {
			const value = await AsyncStorage.getItem(FOXTONS_STORE_ID + id);
			if (value !== null) {
				return JSON.parse(value);
			}
		} catch (error) {
			console.error(error);
		}
	},
	async remove(id) {
		try {
			await AsyncStorage.removeItem(FOXTONS_STORE_ID + id);
		} catch (error) {
			console.error(error);
		}
	}
};

export default storage;
