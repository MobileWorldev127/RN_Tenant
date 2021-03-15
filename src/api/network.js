import { NetworkInfo } from 'react-native-network-info';

let _ipaddress;

async function setIpAddress() {
	await NetworkInfo.getIPV4Address(ip => {
		_ipaddress = ip;
	});
}

function getIpAddress() {
	return _ipaddress;
}

export default {
	setIpAddress,
	getIpAddress
};
