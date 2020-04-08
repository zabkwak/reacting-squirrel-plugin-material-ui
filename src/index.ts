import Server, { IMiddleware, Layout as RSLayout, Plugin } from 'reacting-squirrel/server';

import Layout from './layout';

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
}

export default class MaterialUIPlugin extends Plugin {

	private _options: IOptions = {
		forcePluginLayout: true,
		loadRoboto: true,
	};

	constructor(options: Partial<IOptions>) {
		super();
		this._options = {
			...this._options,
			...options,
		};
	}

	public register(server: Server): void {
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
}

export {
	Layout,
};
