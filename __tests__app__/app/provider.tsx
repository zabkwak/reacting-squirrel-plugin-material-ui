import React from 'react';

import { Component } from 'reacting-squirrel';

export default class Provider extends Component {

	public render(): JSX.Element {
		const { children } = this.props;
		return (
			<div>
				PROVIDER
				{children}
			</div>
		);
	}
}
