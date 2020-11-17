import React from 'react'
import { getAuthData } from '../api/httpApi';
import { Button } from '../components/UI';
import { useHttp } from '../hooks/http.hook';

const MainPage = () => {

	const {loading, request, error, clearError } = useHttp()

	const testHandler = async () => {
		const {jwtToken} = getAuthData()
		console.log(jwtToken)
		const data = await request('/api/budget/info', 'GET', null, {
			Authorization: `Bearer ${jwtToken}`
		})
		console.log(data)
	}
  return (
		<div>
			<h1>Базовая страница</h1>
			<Button disabled={false} type='primary' onClick={testHandler} >Тест</Button>
		</div>
	);
  
}

export default MainPage
