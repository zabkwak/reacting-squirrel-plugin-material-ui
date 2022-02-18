import { ThemeOptions } from '@mui/material';

import fs, { promises as fsAsync } from 'fs';
import path from 'path';
import Server, { IMiddleware, Layout as RSLayout, Plugin } from 'reacting-squirrel/server';

import Layout, { IProps } from './layout';

import RenderMiddleware from './middleware/render';
import StyleMiddleware from './middleware/style';

/**
 * Options for the plugin.
 */
export interface IOptions {
	/**
	 * Indicates if the Roboto font from the googleapis should be loaded.
	 * @default true
	 */
	loadRoboto: boolean;
	/**
	 * Indicates if the Plugin layout should be forced if the layout provided is not extending the Plugin Layout.
	 * @default true
	 */
	forcePluginLayout: boolean;
	/**
	 * Relative path to the theme from the app directory.
	 * @default null
	 */
	theme: string;
	/**
	 * Indicates if the theme should be registered to the Layout using `eval`. It can be dangerous.
	 * @default true
	 */
	evalServerTheme: boolean;
	/**
	 * Relative path to the provider from the app directory.
	 * @default null
	 */
	provider: string;
}

export default class MaterialUIPlugin extends Plugin {

	public static set theme(theme: ThemeOptions) {
		// console.log('Setting theme', theme);
		this._theme = theme;
	}

	public static get theme() {
		return this._theme;
	}

	private static _theme: ThemeOptions;

	private _options: IOptions = {
		evalServerTheme: true,
		forcePluginLayout: true,
		loadRoboto: true,
		theme: null,
		provider: null,
	};

	constructor(options: Partial<IOptions>) {
		super();
		this._options = {
			...this._options,
			...options,
		};
	}

	public async register(server: Server): Promise<void> {
		const { forcePluginLayout } = this._options;
		const LayoutComponent = server.getConfig('layoutComponent');
		if (!(LayoutComponent.prototype instanceof Layout)) {
			if (LayoutComponent === RSLayout) {
				(server as any)._log('[MATERIAL UI PLUGIN]', 'Default Plugin layout used.');
				server.getConfig().layoutComponent = Layout;
			} else {
				(server as any)._warn('[MATERIAL UI PLUGIN]', 'The layout component doesn\'t extend Layout from the Plugin.');
				if (forcePluginLayout) {
					(server as any)._log('[MATERIAL UI PLUGIN]', 'Default Plugin layout used.');
					server.getConfig().layoutComponent = Layout;
				}
			}
		}
		if (this._options.theme) {
			const rsDir = path.resolve(server.appDirAbsolute, '~rs');
			const themePath = this._getThemePath(server.appDirAbsolute);
			const providerPath = this._getProviderPath(server.appDirAbsolute);
			if (themePath) {
				const themeImport = path.relative(rsDir, themePath).replace(/\\/g, '/');
				// const m = '../../../';
				const m = 'reacting-squirrel-plugin-material-ui';
				fs.writeFileSync(path.resolve(rsDir, 'mui.js'), `import ThemeProvider from '${m}/dist/theme-provider';

import theme from '${themeImport}';
${providerPath ? `import Provider from '${path.relative(rsDir, providerPath).replace(/\\/g, '/')}';` : ''}

ThemeProvider.setTheme(theme);
${providerPath ? 'ThemeProvider.setProvider(Provider);' : ''}`);
				if (this._options.evalServerTheme) {
					const transpiled = this._tryTranspileTypescript(themePath) || this._tryTranspileEcmascript(themePath);
					if (transpiled) {
						eval(
							transpiled
								.replace('exports.default', 'MaterialUIPlugin.theme')
								.replace(new RegExp('exports\\["default"\\]', 'g'), 'MaterialUIPlugin.theme'),
						);
					}
				}
			}
		}
		super.register(server);
	}

	public getName(): string {
		return 'Material UI';
	}

	protected getMiddlewares(): Array<IMiddleware> {
		return [
			{
				callback: RenderMiddleware,
			},
			{
				callback: StyleMiddleware,
			},
		];
	}

	protected getStyles(): Array<string> {
		const { loadRoboto } = this._options;
		if (!loadRoboto) {
			return [];
		}
		return [
			'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
		];
	}

	protected getComponentProvider(): string {
		return path.resolve(__dirname, './theme-provider');
	}

	protected getEntryInjections(): string[] {
		if (!this._options.theme) {
			return [];
		}
		return [
			`import './mui';`,
		];
	}

	private _getThemePath(appDir: string): string {
		const themePath = path.resolve(appDir, this._options.theme);
		for (const ext of ['ts', 'js']) {
			let t = themePath;
			if (t.indexOf(`.${ext}`) < 0) {
				t = `${t}.${ext}`;
			}
			if (fs.existsSync(t)) {
				return t;
			}
		}
		return null;
	}

	private _getProviderPath(appDir: string): string {
		if (!this._options.provider) {
			return null;
		}
		return path.resolve(appDir, this._options.provider);
	}

	private _tryTranspileTypescript(themePath: string): string {
		return require('typescript').transpile(fs.readFileSync(themePath).toString());
	}

	private _tryTranspileEcmascript(themePath: string): string {
		return require('@babel/core')
			.transformSync(fs.readFileSync(themePath).toString(), { presets: ['@babel/preset-env'] })
			.code;
	}
}

export {
	Layout,
	IProps as ILayoutProps,
};
