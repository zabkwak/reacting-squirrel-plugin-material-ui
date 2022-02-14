import { Box, LinearProgress } from '@mui/material';
import { WithStyles } from '@mui/styles';

import classnames from 'classnames';
import React from 'react';
import { Component } from 'reacting-squirrel';

import styles from './styles';

interface IOptionalProps {
	loading: boolean;
	wrapper: number;
	footer: React.ReactNode;
}

export interface IProps extends Partial<IOptionalProps> { }

export default class ContentWrapper extends Component<IProps & WithStyles<typeof styles>> {

	public static defaultProps: IOptionalProps = {
		loading: false,
		wrapper: 100,
		footer: null,
	};

	public render(): JSX.Element {
		const { classes, loading, footer } = this.props;
		return (
			<div className={classnames(classes.container, loading && classes.containerLoading)}>
				<Box display="flex" flexDirection="column" height="100%">
					<Box flex="1" overflow="auto">
						{
							loading
								? <LinearProgress color="secondary" />
								: this.renderChildren()
						}
					</Box>
					{footer}
				</Box>
			</div>
		);
	}

	public renderChildren(): JSX.Element | React.ReactNode {
		const { classes, children } = this.props;
		return (
			<div className={classes.wrapper}>
				{children}
			</div>
		);
	}
}
