import { createMuiTheme, ServerStyleSheets, ThemeProvider, Typography } from '@material-ui/core';

import * as md5 from 'md5';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Server, { IRenderLayoutData, IRequest, IResponse } from 'reacting-squirrel/server';
import * as uniqid from 'uniqid';

import StyleStore from '../style-store';

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
				/>,
			),
		);
		StyleStore.register(id, sheets);
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.end(`<!DOCTYPE html>${html}`);
	};
	next();
};
