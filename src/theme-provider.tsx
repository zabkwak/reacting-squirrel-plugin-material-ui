import { createMuiTheme, Theme, ThemeOptions, ThemeProvider as MuiThemeProvider, StylesProvider, createGenerateClassName } from '@material-ui/core';

import * as React from 'react';

const generateClassName = createGenerateClassName({
	productionPrefix: 'c-jss',
});

export default class ThemeProvider extends React.Component {

	private static _theme: Theme = createMuiTheme({});

	private static _instance: ThemeProvider;

	public static changeTheme(theme: ThemeOptions): void {
		this.setTheme(theme);
		this._instance.forceUpdate();
	}

	public static setTheme(theme: ThemeOptions): void {
		this._theme = createMuiTheme(theme);
	}

	public constructor(props: any) {
		super(props);
		ThemeProvider._instance = this;
	}

	public render(): JSX.Element {
		const { children } = this.props;
		return (
			<StylesProvider
				generateClassName={generateClassName}
			>
				<MuiThemeProvider
					theme={ThemeProvider._theme}
				>
					{children}
				</MuiThemeProvider>
			</StylesProvider>
		);
	}
}
