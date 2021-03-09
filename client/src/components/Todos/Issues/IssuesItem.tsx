import React, { Fragment, useState } from 'react';
import {
  ColorInterface,
  TargetInterface,
  TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { formatDate } from '../../../services/utils/dateUtils';
import TaskEditor from '../Backlog/TaskEditor';
import Icon from '../../UI/Icons/Icon';
import { CheckIcon, PencilIcon } from '../../UI/Icons';

interface Props {
  task: TaskInterface;
  colors: ColorInterface[];
  targets: TargetInterface[];
  targetName?: string;
  changeTaskHandler(task: TaskInterface): void;
  deleteTaskHandler(id: string): void;
}

const IssuesItem: React.FC<Props> = ({
  task,
  colors,
  targets,
  targetName,
  changeTaskHandler,
  deleteTaskHandler,
}) => {
  const [taskEditorIsOpen, setTaskEditorIsOpen] = useState(false);

  const onChange = (task: TaskInterface) => {
    changeTaskHandler({ ...task });
    setTaskEditorIsOpen(false);
  };

  return (
    <Fragment>
      {taskEditorIsOpen ? (
        <TaskEditor
          {...task}
          cancelEditor={() => setTaskEditorIsOpen(false)}
          type="edit"
          submit={onChange}
          deleteTask={deleteTaskHandler}
          colors={colors}
          targets={targets}
        />
      ) : (
        <div className="issues-item table__item">
          <div className="issues-item__status">{task.isDone && <CheckIcon />}</div>
          <div className="issues-item__task">{task.name}</div>
          <div className="issues-item__priority">
            {task.priority ? '!'.repeat(4 - task.priority) : '-'}
          </div>
          <div className="issues-item__target">{targetName ? targetName : '-'}</div>
          <div className="issues-item__expiresIn">
            {task.expiresIn ? formatDate(task.expiresIn) : '-'}
          </div>
          <div className="issues-item__date">
            {task.date ? formatDate(task.date) : '-'}
          </div>
          <div className="issues-item__options">
            <Icon classNames="edit" onClick={() => setTaskEditorIsOpen(true)}>
              <PencilIcon />
            </Icon>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default IssuesItem;
