import React from 'react';
import useCoordinate from '../../../hooks/useCoordinate.hook';
import { Placement } from '../../../types';
import { SettingsIcon, TrashIcon } from '../../UI/Icons';
import Icon from '../../UI/Icons/Icon';
import Toast from '../../UI/Toast';

interface Props {
  _id: string;
  name: string;
  amount: number;
  onChangeCategory(e: React.MouseEvent, id: string): void;
  onDeleteCategory(id: string): void;
}

const CategoryItem: React.FC<Props> = props => {
  const toastCoords = useCoordinate(Placement.bottomLeft);

  const deleteCategory = () => {
    props.onDeleteCategory(props._id);
  };

  return (
    <div className="table__item table__budget-categories-item">
      <div>{props.name}</div>
      <div className="table__options">
        <Icon classNames="settings" onClick={e => props.onChangeCategory(e, props._id)}>
          <SettingsIcon />
        </Icon>
        <div ref={toastCoords.parentRef}>
          <Icon classNames="trash" onClick={() => toastCoords.setIsVisible(true)}>
            <TrashIcon />
          </Icon>
        </div>
      </div>
      {toastCoords.isVisible && (
        <Toast
          coords={toastCoords.coords}
          submitHandler={deleteCategory}
          selfRef={toastCoords.childRef}
          textSbmt="Удалить"
          text="Удалить категорию?"
          cancelHandler={() => toastCoords.setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default CategoryItem;
