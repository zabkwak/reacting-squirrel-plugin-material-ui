import { createTheme, Theme, ThemeProvider, ThemeOptions } from '@mui/material';
import React from 'react';
import { ILayoutProps, Layout as Base } from 'reacting-squirrel/server';

import Loader from './components/loader';

export interface IProps<T = {}, U = {}> extends ILayoutProps<T, U> {
	theme: ThemeOptions;
}

export default class Layout<P extends IProps = IProps> extends Base<P> {

	protected _theme: Theme = createTheme({ ...this.props?.theme, ...this._getTheme() });

	public renderContainer(): JSX.Element {
		return (
			<ThemeProvider theme={this._theme}>
				{this.renderThemeContainer()}
			</ThemeProvider>
		);
	}

	public renderLoader(): JSX.Element {
		return <Loader />;
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
