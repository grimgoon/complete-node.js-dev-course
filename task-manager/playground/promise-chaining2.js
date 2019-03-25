require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5c98c615dd8b3f3cf8088e7d').then((res) => {
    console.log(res);
    return Task.countDocuments({completed : false});
}).then((countCompleted) => {
    console.log(countCompleted);
}).catch((e) => {
    console.log(e);
});