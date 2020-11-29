import React, { Fragment, useState } from 'react';

interface Props {
	// items: [];
}

const Select: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  
	const toggleDropdown = () => {
		setIsOpen(isOpen => !isOpen);
  };
  
	return (
		<div className="select">
			<div className="select__input" onClick={toggleDropdown}>
				<span>январь</span>
				<i>х</i>
			</div>
			{isOpen && (
				<Fragment>
					<div className="select__backdrop" onClick={toggleDropdown}></div>
					<div className="select__dropdown">
						{/* {props.months.map(month => ( */}
						<li>Январь</li>
						<li>Февраль</li>
						<li>Январь</li>
						<li>Февраль</li>
						<li>Январь</li>
						<li>Февраль</li>
						{/* ))} */}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default Select;
