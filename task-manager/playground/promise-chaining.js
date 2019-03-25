require('../src/db/mongoose');
const User = require('../src/models/user');


User.findByIdAndUpdate('5c989bbb4254983c684036f9',{
    age : 1,
}).then((user) => {
    console.log(user);
    return User.countDocuments({ age : 1});
}).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});

