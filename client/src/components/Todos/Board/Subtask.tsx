import React from 'react';
import { SubtaskInterface } from '../../../store/ducks/todos/contracts/state';

// interface Props extends SubtaskInterface {}
interface Props  {}

const Subtask: React.FC<Props> = () => {

  const onDeleteSubtask = () => {

  }

 	return (
		<div className="subtask">
			<div className="subtask__content">
				<span className="subtask__button material-icons">arrow_back</span>
        {/* <div>{name}</div> */}
        <div className="subtask__text">name</div>

			</div>
      <span className="subtask__button material-icons" onClick={onDeleteSubtask}>
					delete
				</span>
		</div>
	);
};

export default Subtask;
