import { CircularProgress, Typography } from '@mui/material';
import { WithStyles } from '@mui/styles';

import React from 'react';

import styles from './styles';

export default class Loader extends React.Component<WithStyles<typeof styles>> {

	public render(): JSX.Element {
		const { classes } = this.props;
		return (
			<div className={classes.loaderWrapper}>
				<CircularProgress />
				<Typography id="rs-bundle-progress">0%</Typography>
			</div>
		)
	}
}
