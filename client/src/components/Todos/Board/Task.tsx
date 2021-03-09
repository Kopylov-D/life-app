import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import useColorName from '../../../hooks/color.hook';
import { useInput } from '../../../hooks/input.hook';
import useCoordinate from '../../../hooks/useCoordinate.hook';
import { matchColor } from '../../../services/utils/matchColor';
import { fetchAddSubtask, updateTask } from '../../../store/ducks/todos/actions';
import {
  ColorInterface,
  SubtaskInterface,
  TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { Placement } from '../../../types';
import Checkbox from '../../UI/Checkbox';
import Input from '../../UI/Input';
import Subtask from './Subtask';
import Tooltip from '../../UI/Tooltip';
import Icon from '../../UI/Icons/Icon';
import { ChevronIcon, TrashIcon } from '../../UI/Icons';
import Toast from '../../UI/Toast';

interface Props extends TaskInterface {
  subtasks: SubtaskInterface[];
  task: TaskInterface;
  colors: ColorInterface[];
  onDelete(id: string): void;
  onChecked(task: TaskInterface): void;
}

const Task: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const [subtasksIsOpen, setSubtasksIsOpen] = useState<boolean>(false);
  const [numOfSubtask, setNumOfSubtask] = useState(0);
  const [numDoneSubtask, setNumDoneSubtask] = useState(0);
  const [isDone, setIsDone] = useState(props.isDone);
  const { colorName } = useColorName(props.color, props.colors);

  const input = useInput(
    { initialValue: '' },
    { maxLength: 50, required: false, isEmpty: true }
  );

  const toastCoords = useCoordinate(Placement.bottomLeft);
  const tooltipCoords = useCoordinate();

  useEffect(() => {
    let numOfSubtaskCounter = 0;
    let numDoneSubtaskCounter = 0;

    props.subtasks.forEach(subtask => {
      if (subtask.task === props._id) {
        numOfSubtaskCounter++;
        subtask.isDone && numDoneSubtaskCounter++;
      }
    });
    setNumOfSubtask(numOfSubtaskCounter);
    setNumDoneSubtask(numDoneSubtaskCounter);
  }, [props.subtasks]);

  const onChecked = () => {
    setIsDone(!isDone);
    setTimeout(
      () =>
        props.onChecked({
          ...props.task,
          isDone: !props.isDone,
          inArchive: !props.inArchive,
          level: 0,
        }),
      1000
    );
  };

  const onDeleteTask = () => {
    props.onDelete(props._id);
  };

  const onAddSubtask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.valid) {
      const subtask: SubtaskInterface = {
        _id: '',
        date: new Date(),
        isDone: false,
        level: props.level,
        name: input.value,
        target: props.target,
        task: props._id,
        color: props.color,
      };
      dispatch(fetchAddSubtask(subtask));
      dispatch(updateTask({ ...props.task, isDone: false }, false));

      input.clearValue();
    }
  };

  const onToggleSubtasks = () => {
    setSubtasksIsOpen(!subtasksIsOpen);
  };

  const onMouseOver = () => {
    tooltipCoords.setIsVisible(true);
  };
  const onMouseLeave = () => {
    tooltipCoords.setIsVisible(false);
  };

  let task = (
    <Fragment>
      <div className={classNames('task__main', { [`${colorName}`]: colorName })}>
        <div className="task__content">
          <Checkbox
            checked={isDone}
            onChangeHandler={onChecked}
            color={matchColor(props.priority)}
          />

          <span
            className="task__text"
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            ref={tooltipCoords.parentRef}
          >
            {props.name}
          </span>

          {tooltipCoords.isVisible && (
            <Tooltip
              text={props.name}
              selfRef={tooltipCoords.childRef}
              coords={tooltipCoords.coords}
            />
          )}
          <Icon
            classNames="chevron"
            direction={subtasksIsOpen ? 'up' : undefined}
            onClick={onToggleSubtasks}
          >
            <ChevronIcon />
          </Icon>

          <div className="task__counter">
            {numDoneSubtask}/{numOfSubtask}
          </div>
        </div>
        <div ref={toastCoords.parentRef}>
          <Icon
            classNames="trash"
            onClick={() => {
              toastCoords.setIsVisible(true);
            }}
          >
            <TrashIcon />
          </Icon>
        </div>
      </div>

      <CSSTransition
        in={subtasksIsOpen}
        classNames="subtask"
        mountOnEnter
        unmountOnExit
        timeout={200}
      >
        <div className="task__extend">
          {props.subtasks.map(subtask => {
            if (subtask.task === props._id) {
              return (
                <Subtask
                  key={subtask._id}
                  {...subtask}
                  subtask={subtask}
                  colors={props.colors}
                />
              );
            }
          })}
          <Input
            className="task"
            onChange={input.onChange}
            touched={input.touched}
            onBlur={input.onBlur}
            type="text"
            valid={input.valid}
            value={input.value}
            placeholder="Новая подзадача"
            onKeyPress={onAddSubtask}
          />
        </div>
      </CSSTransition>
    </Fragment>
  );

  if (props.level === 1) {
    task = (
      <Fragment>
        <div className={classNames('task__main', { [`${colorName}`]: colorName })}>
          <div className="task__content">
            <Checkbox
              checked={isDone}
              onChangeHandler={onChecked}
              color={matchColor(props.priority)}
            />
            <span className="task__text">{props.name}</span>
          </div>
          <div ref={toastCoords.parentRef}>
            <Icon
              classNames="trash"
              onClick={() => {
                toastCoords.setIsVisible(true);
              }}
            >
              <TrashIcon />
            </Icon>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="task">
      {task}
      {toastCoords.isVisible && (
        <Toast
          coords={toastCoords.coords}
          submitHandler={onDeleteTask}
          selfRef={toastCoords.childRef}
          textSbmt="Удалить"
          text="Вы действительно хотите удалить?"
          cancelHandler={() => toastCoords.setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default Task;
