import { createTheme, Theme, ThemeOptions, ThemeProvider as MuiThemeProvider, StylesProvider, createGenerateClassName } from '@material-ui/core';

import * as React from 'react';

const generateClassName = createGenerateClassName({
	productionPrefix: 'c-jss',
});

export default class ThemeProvider extends React.Component {

	private static _theme: Theme = createTheme({});

	private static _instance: ThemeProvider;

	private static _provider: typeof React.Component;

	public static changeTheme(theme: ThemeOptions): void {
		this.setTheme(theme);
		this._instance.forceUpdate();
	}

	public static setTheme(theme: ThemeOptions): void {
		this._theme = createTheme(theme);
	}

	public static setProvider(provider: typeof React.Component): void {
		this._provider = provider;
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
					{
						ThemeProvider._provider
							? (
								<ThemeProvider._provider>
									{children}
								</ThemeProvider._provider>
							)
							: children
					}
				</MuiThemeProvider>
			</StylesProvider>
		);
	}
}
