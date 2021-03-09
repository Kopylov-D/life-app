import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
  _id: string;
  name: string;
  addTaskToList(id: string): void;
}

const TaskFromTaskSelector: React.FC<Props> = props => {
  const [isSelected, setIsSelected] = useState(false);

  const selectTask = () => {
    setIsSelected(!isSelected);
    props.addTaskToList(props._id);
  };

  return (
    <div
      className={classNames('task-selector__task', { active: isSelected })}
      onClick={selectTask}
    >
      {props.name}
    </div>
  );
};

export default TaskFromTaskSelector;
