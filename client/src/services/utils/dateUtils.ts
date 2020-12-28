export const formatDate = (date: Date | Date[] | string): string => {
	if (typeof date === 'string') {
		date = new Date(date);
	}
	return date.toLocaleString('ru', {
		year: 'numeric',
		month: 'numeric',
		day: '2-digit',
	});
};

export const parseToDate = (date: string) => {
	return new Date(Date.parse(date));
};

export const toDate = (date: Date | Date[] | string) => {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	return date;
};
