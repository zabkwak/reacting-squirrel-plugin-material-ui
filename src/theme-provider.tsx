import { createMuiTheme, Theme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@material-ui/core';

import * as React from 'react';

export default class ThemeProvider extends React.Component {

	private static _theme: Theme;

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
			<MuiThemeProvider
				theme={ThemeProvider._theme}
			>
				{children}
			</MuiThemeProvider>
		);
	}
}
