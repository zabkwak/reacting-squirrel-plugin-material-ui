import Server, { IRequest, IResponse } from 'reacting-squirrel/server';

import StyleStore from '../style-store';

export default (server: Server) => (req: IRequest, res: IResponse, next: () => void) => {
	if (req.path === '/css/material-ui.css' && req.query.id) {
		res.header('Content-Type', 'text/css');
		// @ts-ignore
		res.end(StyleStore.toString(req.query.id, !server.dev));
		return;
	}
	next();
};
