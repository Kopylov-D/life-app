import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { formatDate } from '../../../services/utils/dateUtils';
import {
	ColorInterface,
	TargetInterface,
} from '../../../store/ducks/todos/contracts/state';
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


	return (
		<Fragment>
			<div
				className={classNames('target', colorName)}
				onClick={() => setEditorIsOpen(true)}
			>
				<div className="target__content">
					<div className="target__name">{props.name}</div>
				</div>
				<div className="target__date">{formatDate(props.date)}</div>
				<div className="target__options"></div>
			</div>

			<CSSTransition
				in={editorIsOpen}
				timeout={100}
				classNames="modal"
				mountOnEnter
				unmountOnExit
			>
				<TargetEditor
					_id={props._id}
					isDone={props.isDone}
					date={props.date}
					name={props.name}
					notes={props.notes}
					color={props.color}
					expiresIn={props.expiresIn}
					priority={props.priority}
					type="edit"
					closeEditor={() => setEditorIsOpen(false)}
					submit={props.changeTargetHandler}
					deleteTargetHandler={props.deleteTargetHandler}
					colors={props.colors}
				/>
			</CSSTransition>
		</Fragment>
	);
};

export default Target;
