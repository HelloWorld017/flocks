class Transform {
	static rotate(polygon, theta, origin) {
		return polygon.map((point) => ({
			x: (point.x - origin.x) * Math.cos(theta) + (point.y - origin.y) * Math.sin(theta) + origin.x,
			y: (point.x - origin.x) * Math.sin(theta) - (point.y - origin.y) * Math.cos(theta) + origin.y
		}));
	}
}

export default Transform;
