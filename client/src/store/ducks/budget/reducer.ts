type InitialStateType = {
	info: number;
};

const initialState: InitialStateType = {
	info: 2,
};

export const budgetReducer = (
	state = initialState,
	action: any
): InitialStateType => {
	switch (action.type) {
		default:
			return state;
	}
};
