const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser : true,
    useCreateIndex : true,
});

const User = mongoose.model('User', {
    name : {
        type: String,
        required : true,
        trim : true,
    },
    age : {
        type: Number,
        default : 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email : {
        type: String,
        required : true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('String must be a corret email');
            }
        }
    }
});


const me = new User({
    name : ' Meep Maap',
    email: 'Moop@mOop.su '
});

me.save().then(response => {
    console.log(me);
    console.log(response);
}).catch(error => {
    console.log(error);
});


const Tasks = mongoose.model('Tasks', {
    description : {
        type: String
    },
    completed : {
        type: Boolean
    },
});


// const task = new Tasks({
//     description : 'Learn about Tasks',
//     completed: false,
// });

// task.save().then(response => {
//     console.log(task);
//     console.log(response);
// }).catch(error => {
//     console.log(error);
// });