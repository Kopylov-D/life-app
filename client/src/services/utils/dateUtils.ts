export const formatDate = (date: Date | Date[] | string): string => {
  if (typeof date === 'string') {
    date = new Date(date)
  }
	return date.toLocaleString('ru', {
		year: 'numeric',
		month: 'numeric',
		day: '2-digit',
	});
};
