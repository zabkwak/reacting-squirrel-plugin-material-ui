# reacting-squirrel-plugin-material-ui
[Material UI](https://material-ui.com/) plugin for [Reacting Squirrel](https://www.npmjs.com/package/reacting-squirrel).

## Installation
```bash
nmp install reacting-squirrel-plugin-material-ui --save
```

## Usage
### Javascript
```javascript
import Server from 'reacting-squirrel';
import MUIPlugin from 'reacting-squirrel-plugin-material-ui';

const app = new Server(/* ...options */);
app.registerPlugin(new MUIPlugin(/* ...options */));
// ... setup of the server
app.start();
```
### RSConfig
```json
{
	// ...setup of the server
	"plugins": [
		[
			"reacting-squirrel-plugin-material-ui",
			{
				"theme": "./theme"
			}
		]
	]
}
```

## Themes
The theme registered via plugin options must be a TS or JS file with default export of `ThemeOptions` of the Material UI.
The theme is used by `ThemeProvider` on the server and client sides.

## Options
| option | type | description | default |
| :--- | :--- | :--- | :--- |
| loadRoboto | boolean | Indicates if the Roboto font from the googleapis should be loaded. | `true` |
| forcePluginLayout | boolean | Indicates if the Plugin layout should be forced if the layout provided is not extending the Plugin Layout. | `true` |
| theme | string | Relative path to the theme from the app directory. | `null` |
| evalServerTheme | boolean | Indicates if the theme should be registered to the Layout using `eval`. It can be dangerous. | `true` |
