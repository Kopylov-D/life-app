import classNames from 'classnames';
import React from 'react';
import useCoordinate from '../../../hooks/useCoordinate.hook';
import { formatDate } from '../../../services/utils/dateUtils';
import { TransactionInterface } from '../../../store/ducks/budget/contracts/state';
import { Placement } from '../../../types';
import { TrashIcon } from '../../UI/Icons';
import Icon from '../../UI/Icons/Icon';
import Toast from '../../UI/Toast';

interface Props extends TransactionInterface {
  onDeleteTransaction(_id: string): void;
}

const Transaction: React.FC<Props> = ({
  _id,
  date,
  amount,
  category,
  isExpense,
  onDeleteTransaction,
}) => {
  const toastCoords = useCoordinate(Placement.bottomLeft);

  return (
    <div
      className={classNames(
        'table__item',
        { 'color-expense': isExpense },
        { 'color-income': !isExpense }
      )}
    >
      <div>{formatDate(date)}</div>
      <div>{amount} руб.</div>
      <div>{category.name}</div>

      <div className="table__options">
        <div ref={toastCoords.parentRef}>
          <Icon classNames="trash" onClick={() => toastCoords.setIsVisible(true)}>
            <TrashIcon />
          </Icon>
        </div>
      </div>

      {toastCoords.isVisible && (
        <Toast
          coords={toastCoords.coords}
          submitHandler={() => onDeleteTransaction(_id)}
          selfRef={toastCoords.childRef}
          textSbmt="Удалить"
          text="Удалить операцию?"
          cancelHandler={() => toastCoords.setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default Transaction;
