// import { useState, useCallback } from 'react';

// export const useHttp = () => {
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [error, setError] = useState<string | null>(null);

// 	const request = useCallback(
// 		async (url, method = 'GET', body = null, headers = {}) => {
// 			setLoading(true);
// 			try {
// 				if (body) {
// 					body = JSON.stringify(body);
// 					headers['Content-Type'] = 'application/json';
// 				}

// 				const response = await fetch(url, { method, body, headers });
// 				const data = await response.json();

// 				if (!response.ok) {
// 					throw new Error(data.message || 'Что-то пошло не так');
// 				}

// 				setLoading(false);

// 				return data;
// 			} catch (e) {
// 				setLoading(false);
// 				setError(e.message);
// 				throw e;
// 			}
// 		},
// 		[]
// 	);

// 	const clearError = useCallback(() => setError(null), []);

// 	return { loading, request, error, clearError };
// };

export const getAuthData = () => {
	const jwtTokenCookie: RegExpMatchArray | null = document.cookie.match(
		`(^|; )jwtToken=([^;]*)`
	);
	const userIdCookie: RegExpMatchArray | null = document.cookie.match(
		`(^|; )userId=([^;]*)`
	);

	if (jwtTokenCookie) {
		const jwtToken: string = jwtTokenCookie[2];
		const userId: string = userIdCookie![2];

		return {
			jwtToken,
			userId,
		};
	}

	return {
		jwtToken: null,
		userId: null,
	};
};
