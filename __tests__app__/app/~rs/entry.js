import './nonce';
import Application, { Socket, Text } from 'reacting-squirrel';
import { ErrorPage } from 'reacting-squirrel'

import routingMap from './router.map';
import socketEvents from './socket.map';
import components from './component.map';

// Import and register default dictionary.
import defaultDictionary from '../res/text.json';
Text.addDictionary(defaultDictionary);
// Import and register accepted locale dictionaries.

// Set the dictionary from locale
let dictionary = 'default';
if (Application.getCookie(Application.LOCALE_COOKIE_NAME)) {
	dictionary = Application.getCookie(Application.LOCALE_COOKIE_NAME);
} else if (navigator && navigator.language) {
	dictionary = navigator.language;
}
Application.setLocale(dictionary);

// Register data to application and start it.
Application
	.registerRoutingMap(routingMap)
	.registerComponents(components)
	.registerErrorPage(ErrorPage)
	.start();
Socket.registerEvents(socketEvents);
Socket.connect();
// Injected code

