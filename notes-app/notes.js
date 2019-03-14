const fs = require('fs');
const chalk = require('chalk');

const fileName = 'notes.json';

getNotes = () => {
    return "Your notes..."
}

debugger

const addNote = (title,body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
    
        saveNotes(notes);
    } else {
        console.log('Note title taken!');
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);

    if(newNotes.length !== notes.length) {
        saveNotes(newNotes);
        console.log('Removed Note!');
    } else {
        console.log('Note does not exist');
    }
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync(fileName);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }

}

const saveNotes  = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(fileName, dataJSON);
}

const listNotes = () => {
    const notes = loadNotes();

    console.log("Your Notes:")
    notes.forEach((note,i) => {
        
        if(i%2 === 0) {
            console.log(chalk.green.inverse("Title: " + note.title));
        }
        else {
            console.log(chalk.yellow.inverse("Title: " + note.title));
        }
        
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    
    const readNote = notes.find(note => note.title === title);

    if(readNote) {
        console.log("Title: " + readNote.title);
        console.log("Body: " + readNote.body);
    }
    else {
        console.log("Note could not be found!")
    }

}



module.exports =  {
    getNotes: getNotes,
    addNote: addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
};