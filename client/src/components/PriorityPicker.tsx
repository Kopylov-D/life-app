import React, { useState } from 'react';
import { matchColor } from '../services/utils/matchColor';
import { Priority } from '../store/ducks/todos/contracts/state';
import Dropdown from './UI/Dropdown';
import { PriorityIcon } from './UI/Icons';
import Icon from './UI/Icons/Icon';

interface Props {
  priority: Priority;
  changePriority(id: number): void;
}

const priorityPickerItems = [
  { id: 1, name: 'Высокий' },
  { id: 2, name: 'Средний' },
  { id: 3, name: 'Низкий' },
  { id: 0, name: 'Без приоритета' },
];

const PriorityPicker: React.FC<Props> = props => {
  const [priorityPickerIsOpen, setPriorityPickerIsOpen] = useState<boolean>(false);

  const onTogglePriorityPickerHandler = (e: React.MouseEvent) => {
    setPriorityPickerIsOpen(!priorityPickerIsOpen);
  };

  const onChangePriorityHandler = (id: Priority) => {
    props.changePriority(id);
    setPriorityPickerIsOpen(false);
  };

  return (
    <div className="with-dropdown">
      <Icon
        classNames={`priority icon--${matchColor(props.priority)}`}
        onClick={onTogglePriorityPickerHandler}
      >
        <PriorityIcon />
      </Icon>

      {priorityPickerIsOpen && (
        <Dropdown
          items={priorityPickerItems}
          onClick={onChangePriorityHandler}
          value={props.priority}
        />
      )}
    </div>
  );
};

export default PriorityPicker;
