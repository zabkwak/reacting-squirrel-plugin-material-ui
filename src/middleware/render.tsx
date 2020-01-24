import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Server, { IRequest, IResponse, Layout } from 'reacting-squirrel/server';

export default (server: Server) => (req: IRequest, res: IResponse, next: () => void) => {
	const { layoutComponent, cssDir } = server.getConfig();
	res.render = ({
		scripts, styles, data, title, layout,
	}: any) => {
		const LayoutComponent = layout || layoutComponent;
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.end(`<!DOCTYPE html>${ReactDOMServer.renderToString(<LayoutComponent
			scripts={server.getConfig().scripts.concat(scripts || [])}
			styles= {server.getConfig().styles.concat(styles || [`/${cssDir}/rs-app.css`])}
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
		/>)}`);
	};
	next();
};
