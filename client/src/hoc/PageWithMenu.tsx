import React from 'react';

const withFeature = (items: string) => {
	return (Component: Function) => (props: React.ComponentProps<any>) => {
		return (
			<main className="main__content">
				<div> </div>

				<div className="component-frame">{props.children}</div>
			</main>
		);

	};
};

export {}
