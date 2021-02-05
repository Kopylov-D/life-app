import React, { Fragment, useState } from 'react';
import trash from '../../../assets/img/trash.svg';
import gear from '../../../assets/img/gear.svg';

import { formatDate } from '../../../services/utils/dateUtils';
import {
	ColorInterface,
	TargetInterface,
} from '../../../store/ducks/todos/contracts/state';

import classNames from 'classnames';
import useColorName from '../../../hooks/color.hook';
import TargetEditor from './TargetEditor';

interface Props extends TargetInterface {
	colors: ColorInterface[];
	deleteTargetHandler(id: string): void;
	changeTargetHandler(target: TargetInterface): void;
}

const Target: React.FC<Props> = props => {
	const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
	const { colorName } = useColorName(props.color, props.colors);

	// const onChange = (target: TargetInterface) => {
	// 	props.changeTarget(target);
	// };

	return (
		<Fragment>
			<div
				className={classNames('target', colorName)}
				onClick={() => setEditorIsOpen(true)}
			>
				<div className="target__content">
					{/* <Checkbox checked={props.isDone} id={props._id} onChangeHandler={onChecked} /> */}

					<div className="target__name">{props.name}</div>
				</div>
				<div className="target__date">{formatDate(props.date)}</div>
				<div className="target__options">
					{/* <img src={trash} alt="" onClick={onDelete} /> */}
					{/* <img src={gear} alt="" onClick={() => setEditorIsOpen(true)} /> */}
				</div>
			</div>

			{editorIsOpen && (
				<TargetEditor
					_id={props._id}
					isDone={props.isDone}
					date={props.date}
					name={props.name}
					notes={props.notes}
					color={props.color}
					type="edit"
					closeEditor={() => setEditorIsOpen(false)}
					submit={props.changeTargetHandler}
					deleteTargetHandler={props.deleteTargetHandler}
					colors={props.colors}
				/>
			)}
		</Fragment>
	);
};

export default Target;
