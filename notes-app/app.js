const yargs = require('yargs');
const chalk = require('chalk');
const getNotes = require('./notes');

// Customize yargs version.
yargs.version('1.1.0');

// Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : 'Note body',
            demandOption : true,
            type : 'string',
        }
    },
    handler: function (argv) {
        console.log('Adding a new Note!', argv.title)
        console.log(argv.body);
    }
});

// Remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    handler: function () {
        console.log('Removing a new Note!')
    }
});

// List command 
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function () {
        console.log('Listing a Note!')
    }
});

// Read  command 
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a Note!')
    }
});

yargs.parse();


