const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes');

// Customize yargs version.
yargs.version('1.1.0');

// Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv)=>{
        notes.addNote(argv.title, argv.body);
    }
});

// Remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Note Title',
        }
    },
    handler: (argv)=>{
        notes.removeNote(argv.title);
    }
});

// List command 
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: ()=>{
        notes.listNotes();
    }
});

// Read  command 
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: (argv)=>{
        notes.readNote(argv.title);
    }
});

yargs.parse();
