export const debounce = (fn: any, ms: number): any => {
  let timeout: any;
	return function () {
		const fnCall = function (this: typeof fn) {
			fn.apply(this, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(fnCall, ms);
	};
};

