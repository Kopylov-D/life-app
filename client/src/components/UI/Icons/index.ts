import { Icons } from '../../../types';

import { ReactComponent as BoardIcon } from '../../../assets/icons/clipboard-outline.svg';
import { ReactComponent as BacklogIcon } from '../../../assets/icons/file-tray-stacked-outline.svg';
import { ReactComponent as IssuesIcon } from '../../../assets/icons/albums-outline.svg';

// import Icon from './UI/Icons/Icon';

export const icons = [
	{ name: Icons.board, component: BoardIcon },
	{ name: Icons.backlog, component: BacklogIcon },
	{ name: Icons.issues, component: IssuesIcon },
];

export { ReactComponent as BoardIcon } from '../../../assets/icons/clipboard-outline.svg';
export { ReactComponent as BacklogIcon } from '../../../assets/icons/file-tray-stacked-outline.svg';
export { ReactComponent as IssuesIcon } from '../../../assets/icons/albums-outline.svg';
