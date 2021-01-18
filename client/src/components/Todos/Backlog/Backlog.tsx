import React from 'react';
import Table from '../../Table';
import NewBacklogTask from './NewBacklogTask';

interface Props {}

const Backlog: React.FC<Props> = props => {
	return (
		<div className="todos__backlog">
			<Table class="backlog" headerItems={['Срок выполнения', 'Название','Приоритет']}>
				<NewBacklogTask />
			</Table>
		</div>
	);
};

export default Backlog;
