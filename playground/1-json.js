const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json',bookJSON);

//  const dataBuffer =fs.readFileSync('1-json.json');
//  const dataJSON = dataBuffer.toString();
//  const data = JSON.parse(dataJSON);

//  console.log(data.title);

const fileName = '1-json.json';

const data = fs.readFileSync(fileName);
const meep = JSON.parse(data.toString());

meep.name = "Alexander";
meep.age = 24;


console.log(meep);

fs.writeFileSync(fileName,JSON.stringify(meep));