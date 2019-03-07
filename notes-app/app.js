const fs = require('fs');

// fs.writeFileSync('notes.txt','My name is Alexander.');

try {
    fs.appendFileSync('notes.txt', '\nNew line!');
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    /* Handle the error */
  }