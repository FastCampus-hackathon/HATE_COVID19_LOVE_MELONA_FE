const convertDistance = (distance) => {
	if (distance < 1000) {
		return `${distance}m`;
	}

	if (distance > 999 && distance < 99999) {
		return `${(distance / 1000).toFixed(1)}km`;
	}

	if (distance === 999999) {
		return `정보없음`;
	}
	return distance;
};

export default convertDistance;
