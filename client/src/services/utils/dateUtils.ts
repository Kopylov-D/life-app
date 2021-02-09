export const formatDate = (date: Date | Date[] | string, type: string = ''): string => {
	if (typeof date === 'string') {
		date = new Date(Date.parse(date));
	}

	switch (type) {
		case 'short':
			return date.toLocaleString('ru', {
				year: '2-digit',
				month: 'short',
			});
		default:
			return date.toLocaleString('ru', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			});
	}
};

// export const parseToDate = (date: string) => {
// 	return new Date(Date.parse(date));
// };

export const toDate = (date: Date | string) => {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	return date;
};
