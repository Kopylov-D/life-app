import { RootState } from '../../rootReducer';

export const selectCategories = (state: RootState) => {
	const cat = state.budget.categories;
	const tr = state.budget.items;

	console.log('cat', cat)


	let arr = [];

	arr = cat.map((cItem: any) => {
		tr.forEach((t: any) => {
			if (t.category === cItem._id) {
        // console.log(cItem)
				if (cItem.amount) {
					cItem.amount += t.amount;
					// console.log(cItem.amount)
				} else {
					cItem.amount = t.amount;
					// console.log(cItem.amount)
				}
			}
		});
		return cItem;
	});

	// console.log('arr', arr);
	return arr;
};

export const selectExample = (state: RootState) => {
	return state.budget.categories 
}
