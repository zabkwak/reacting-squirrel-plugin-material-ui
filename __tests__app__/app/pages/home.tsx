import Button from '@material-ui/core/Button';

import { Typography, Grid, TextField } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Page } from 'reacting-squirrel';

export default class HomePage extends Page {

	public render(): JSX.Element {
		return (
			<>
				<Grid container>
					<Grid item xs>
						<TextField
							label="Label"
							placeholder="Placeholder"
							multiline
							fullWidth
						/>
					</Grid>
					<Grid item xs={10}>
						<Typography variant="h1">H1</Typography>
						<Button variant="contained" color="primary">Button</Button>
					</Grid>
				</Grid>
			</>
		);
	}
}
