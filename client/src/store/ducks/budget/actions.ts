import { getAuthData } from "../../../api/httpApi";


export function getData() {
  return async (dispatch: any) => {
    // dispatch(authStart());
		try {
			const jwtToken = getAuthData()
			console.log(jwtToken)
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
        
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Что-то пошло не так');
			}

			console.log(data);

			// document.cookie = `jwtToken=${data.token}; max-age=36000`;
			// document.cookie = `userId=${data.userId}; max-age=36000`;
			// dispatch(authSuccess(data));
		} catch (e) {
			console.log(e);
			// dispatch(authError(e.message));
		}
  }
}