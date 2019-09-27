const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

//command add
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		subtitle: {
			describe: 'Note subtitle',
			type: 'string'
		},
		author: {
			describe: 'Author of the note',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body content',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function (argv) {
		notes.addNote(argv.title, argv.subtitle, argv.author, argv.body)
	}
})

// command remove

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function (argv) {
		notes.removeNote(argv.title);
		console.log('note removed: ' + argv.title);
	}
})

//command list

yargs.command({
	command: 'list',
	describe: 'List notes',
	handler: () => {
		notes.listNote();
	}
})

//command read

yargs.command({
	command: 'read',
	describe: 'Reads a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function (argv) {
		notes.readNote(argv.title)
	}
})

yargs.parse();
