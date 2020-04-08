import { CircularProgress, createMuiTheme, Theme, ThemeProvider } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import { Layout as Base } from 'reacting-squirrel/server';

export default class Layout extends Base {

	protected _theme: Theme = createMuiTheme(this._getTheme());

	public renderContainer(): JSX.Element {
		return (
			<ThemeProvider theme={this._theme}>
				{this.renderThemeContainer()}
			</ThemeProvider>
		);
	}

	public renderLoader(): JSX.Element {
		return (
			<div id="rs-main-loader">
				<CircularProgress />
			</div>
		);
	}

	public renderThemeContainer(): JSX.Element {
		return super.renderContainer();
	}

	/**
	 * Gets the theme for the layout.
	 */
	protected _getTheme(): ThemeOptions {
		return {};
	}
}
