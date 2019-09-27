const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, subtitle, author, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

	debugger

	if (!duplicateNote) {
		notes.push({
			title: title,
			subtitle: subtitle,
			author: author,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green.inverse('New note added!'))
	} else {
		console.log(chalk.red.inverse('Note title taken!'))
	}
}

const removeNote = function (title) {
	const notes = loadNotes()
	const notesToKeep = notes.filter(function (note) {
		return note.title !== title
	})

	if (notes.length > notesToKeep.length) {
		console.log(chalk.green.inverse('Note removed!'))
		saveNotes(notesToKeep)
	} else {
		console.log(chalk.red.inverse('No note found!'))
	}
}

const saveNotes = function (notes) {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

const listNote = () => {
	const notes = loadNotes();
	console.log('Your notes: ');
	notes.forEach(note => {
		console.log(chalk.yellow(note.title));
	});

}

const readNote = function (title) {
	const notes = loadNotes();
	const noteToRead = notes.find((note) => note.title === title);

	if (noteToRead) {
		console.log('Title: ' + noteToRead.title);
		console.log('Note: ' + noteToRead.body);
		console.log('Writen by ' + noteToRead.author);
	} else {
		console.log(chalk.red.inverse('No title found'));
	}
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNote: listNote,
	readNote: readNote
}