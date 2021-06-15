export const cartReducer = (state = null, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return action.payload;
		default:
			return state;
	}
};
