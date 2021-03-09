import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toDate } from '../../services/utils/dateUtils';
import { selectLoadingStatus } from '../../store/ducks/budget/selectors';
import { LoadingStatus } from '../../store/types';
import Button from '../UI/Button';
import Icon from '../UI/Icons/Icon';
import { ChevronIcon } from '../UI/Icons';

interface Props {
  startDate: string;
  year: number;
  changeYear(year: number): void;
}

const YearChanger: React.FC<Props> = props => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const loadingStatus = useSelector(selectLoadingStatus);

  useEffect(() => {
    setYear(props.year);
  }, []);

  const prevYearHandler = () => {
    const minYear = toDate(props.startDate).getFullYear();
    let newYear = year - 1;
    if (newYear >= minYear) {
      setYear(newYear);
      props.changeYear(newYear);
    }
  };

  const nextYearHandler = () => {
    const maxYear = new Date().getFullYear();
    let newYear = year + 1;
    if (newYear <= maxYear) {
      setYear(newYear);
      props.changeYear(newYear);
    }
  };

  return (
    <div className="year-changer">
      <Button
        onClick={prevYearHandler}
        type="count"
        disabled={loadingStatus === LoadingStatus.LOADING}
      >
        <Icon classNames="chevron" direction="left">
          <ChevronIcon />
        </Icon>
      </Button>
      <span>{year} </span>
      <Button
        onClick={nextYearHandler}
        type="count"
        disabled={loadingStatus === LoadingStatus.LOADING}
      >
        <Icon classNames="chevron" direction="right">
          <ChevronIcon />
        </Icon>
      </Button>
    </div>
  );
};

export default YearChanger;
