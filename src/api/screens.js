let _screens = {};

// Store screen reference
function setReference(name, screen) {
	_screens[name] = screen;
}

// Retrieve screen reference
function getReference(name) {
	return _screens[name];
}

export default {
	setReference,
	getReference
};
