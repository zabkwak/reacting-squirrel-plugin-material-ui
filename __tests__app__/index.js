const Server = require('reacting-squirrel/server').default;
const path = require('path');

new Server({
	rsConfig: path.resolve(__dirname, 'rsconfig.json'),
})
	.start((err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log('APP STARTED');
	});
