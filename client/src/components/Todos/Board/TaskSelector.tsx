import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTasksToCard } from '../../../store/ducks/todos/actions';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import TaskFromTaskSelector from './TaskFromTaskSelector';

interface Props {
  tasks: TaskInterface[];
  level: number;
  close(): void;
}

const TaskSelector: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [listIsEmpty, setListIsEmpty] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const addTaskToListHandler = (id: string) => {
    if (selectedTasks.includes(id)) {
      const tasks = selectedTasks.filter(item => item !== id);
      setSelectedTasks(tasks);
    } else {
      setSelectedTasks(tasks => [...tasks, id]);
    }
  };

  useEffect(() => {
    selectedTasks.length ? setIsDisabled(false) : setIsDisabled(true);
  }, [selectedTasks]);

  const addSelectedTaskToBoard = () => {
    dispatch(addTasksToCard(selectedTasks, props.level));
    props.close();
  };

  return (
    <Modal class="task-selector" closeModal={props.close}>
      <div className="task-selector__list">
        {listIsEmpty && 'Нет подходящих задач. Добавьте новую задачу в бэклог'}

        {props.tasks.map(task => {
          if (!task.subtask && !task.level) {
            listIsEmpty && setListIsEmpty(false);

            return (
              <TaskFromTaskSelector
                key={task._id}
                _id={task._id}
                name={task.name}
                addTaskToList={addTaskToListHandler}
              />
            );
          }
        })}
      </div>

      <div className="task-selector__buttons">
        <Button onClick={addSelectedTaskToBoard} size="small" disabled={isDisabled}>
          Добавить
        </Button>
        <Button onClick={props.close} size="small" color="secondary">
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

export default TaskSelector;
