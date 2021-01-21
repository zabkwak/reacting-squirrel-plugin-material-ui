import { CircularProgress, createMuiTheme, Theme, ThemeProvider, Typography, StylesProvider, createGenerateClassName } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import { ILayoutProps, Layout as Base } from 'reacting-squirrel/server';

export interface IProps<T = {}, U = {}> extends ILayoutProps<T, U> {
	theme: ThemeOptions;
}

const generateClassName = createGenerateClassName({
	productionPrefix: 'c',
});

export default class Layout<P extends IProps = IProps> extends Base<P> {

	protected _theme: Theme = createMuiTheme({ ...this.props?.theme, ...this._getTheme() });

	public renderContainer(): JSX.Element {
		return (
			<StylesProvider generateClassName={generateClassName}>
				<ThemeProvider theme={this._theme}>
					{this.renderThemeContainer()}
				</ThemeProvider>
			</StylesProvider>
		);
	}

	public renderLoader(): JSX.Element {
		return (
			<div id="rs-main-loader">
				<CircularProgress />
				<Typography id="rs-bundle-progress">0%</Typography>
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
