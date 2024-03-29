import { ServerStyleSheets } from '@mui/styles';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Server, { IRenderLayoutData, IRequest, IResponse } from 'reacting-squirrel/server';
import uniqid from 'uniqid';

import StyleStore from '../style-store';
import Plugin from '../';

export default (server: Server) => (req: IRequest, res: IResponse, next: () => void) => {
	const { layoutComponent, cssDir } = server.getConfig();
	res.renderLayout = ({
		scripts, styles, data, title, layout,
	}: IRenderLayoutData) => {
		const LayoutComponent = layout || layoutComponent;
		const sheets = new ServerStyleSheets();
		const id = uniqid();
		const html = ReactDOMServer.renderToString(
			sheets.collect(
				<LayoutComponent
					scripts={[...server.getConfig('scripts'), ...(scripts || [])]}
					styles={[
						`/css/material-ui.css?id=${id}`,
						...server.getConfig('styles'),
						...(styles || []),
						`/${cssDir}/rs-app.css`,
					]}
					initialData={data || {}}
					title={title.indexOf(':') === 0 ? server.getLocaleText(req.locale, title.substr(1)) : title}
					user={(req as any).user}
					version={server.version}
					bundle={server.bundlePath}
					url={{
						hostname: req.get('host'),
						pathname: req.originalUrl,
						protocol: req.protocol,
					}}
					getText={(key: string, ...args: Array<any>) => server.getLocaleText(req.locale, key, ...args)}
					nonce={server.nonce}
					theme={Plugin.theme}
					componentWrappers={
						server
							.getRegisteredComponents()
							.filter(({ auto }) => auto)
							.map(({ elementId }) => elementId)
					}
				/>,
			),
		);
		StyleStore.register(id, sheets);
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.end(`<!DOCTYPE html>${html}`);
	};
	next();
};
