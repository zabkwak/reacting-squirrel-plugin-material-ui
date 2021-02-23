import { ServerStyleSheets } from '@material-ui/core';
import * as CleanCSS from 'clean-css';
import * as md5 from 'md5';

export default class StyleStore {

	private static _idMap: { [key: string]: Array<string> } = {};

	private static _map: { [key: string]: ServerStyleSheets } = {};

	public static register(id: string, stylesheet: ServerStyleSheets) {
		const key = md5(stylesheet.toString());
		if (this._idMap[key]) {
			this._idMap[key].push(id);
			return;
		}
		this._idMap[key] = [id];
		this._map[key] = stylesheet;
	}

	public static get(id: string): ServerStyleSheets {
		// tslint:disable-next-line: forin
		for (const key in this._idMap) {
			const list = this._idMap[key];
			if (list.includes(id)) {
				return this._map[key];
			}
		}
		return null;
	}

	public static toString(id: string, minify: boolean = false): string {
		const stylesheet = this.get(id);
		if (stylesheet) {
			if (minify) {
				const cleanCss = new CleanCSS();
				return cleanCss.minify(stylesheet.toString()).styles;
			}
			return stylesheet.toString();
		}
		return '';
	}
}
