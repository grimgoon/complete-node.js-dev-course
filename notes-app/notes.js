const fs = require('fs');

const fileName = 'notes.json';

getNotes = () => {
    return "Your notes..."
}

const addNote = (title,body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(note => note.title === title);

    if(duplicateNotes.length === 0) {
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

module.exports =  {
    getNotes: getNotes,
    addNote: addNote,
    removeNote : removeNote
};