import { useState, useEffect } from 'react';
import { ColorInterface, TargetInterface } from '../store/ducks/todos/contracts/state';

export default function useColorName(
	color: string | undefined,
	colors: ColorInterface[],
	target?: string,
	targets?: TargetInterface[]
) {
	const [currentColor, setCurrentColor] = useState<string>('');
	const [currentColorId, setCurrentColorId] = useState<string | undefined>(undefined);

	useEffect(() => {
		const colorName = colors.find(item => item._id === color)?.name;
		colorName && setCurrentColor(colorName);

		if (target && targets) {
			const colorId = targets.find(item => item._id === target)?.color;
			colorId && setCurrentColorId(colorId);
		}
	}, [color, target]);

	return { colorName: currentColor, colorId: currentColorId };
}
