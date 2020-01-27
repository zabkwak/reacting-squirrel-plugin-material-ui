import Server, { IMiddleware, Plugin } from 'reacting-squirrel/server';

import Layout from './layout';

import RenderMiddleware from './middleware/render';
import StyleMiddleware from './middleware/style';

export default class MaterialUIPlugin extends Plugin {

	public register(server: Server): void {
		const LayoutComponent = server.getConfig('layoutComponent');
		if (!(new LayoutComponent({}) instanceof Layout)) {
			(server as any)._warn('[MATERIAL UI PLUGIN]', 'The layout component doesn\'t extend Layout from the Plugin.');
			server.getConfig().layoutComponent = Layout;
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
		return [
			'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
		];
	}
}
