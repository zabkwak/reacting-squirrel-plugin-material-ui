import Button from '@mui/material/Button';

import { Typography, Grid, TextField, createTheme, colors } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Page } from 'reacting-squirrel';

import ThemeProvider from '../../../dist/theme-provider';
import ContentWrapper from '../components/content-wrapper';

export default class HomePage extends Page {

	public render(): JSX.Element {
		return (
			<ContentWrapper>
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
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								ThemeProvider.changeTheme({
									palette: {
										primary: colors.green,
									},
								});
							}}
						>Change theme</Button>
					</Grid>
				</Grid>
			</ContentWrapper>
		);
	}
}
