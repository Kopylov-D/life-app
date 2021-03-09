import classNames from 'classnames';
import React, { useState } from 'react';
import { ColorInterface } from '../store/ducks/todos/contracts/state';

interface Props {
  colors: ColorInterface[];
  initialColor?: string;
  onColorSelect(id: string): void;
}

const Colorpicker: React.FC<Props> = ({ colors, initialColor, onColorSelect }) => {
  const [activeColorId, setActiveColorId] = useState(initialColor);

  const onColorClick = (id: string) => {
    onColorSelect(id);
    setActiveColorId(id);
  };

  return (
    <div className="colorpicker">
      {colors.map(color => (
        <div
          key={color._id}
          className={classNames('colorpicker__item', color.name, {
            active: activeColorId === color._id,
          })}
          onClick={() => onColorClick(color._id)}
        ></div>
      ))}
    </div>
  );
};

export default Colorpicker;
