const express = require('express');
require('./db/mongoose');

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Load in routers
app.use(userRouter);
app.use(taskRouter);

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    }
});


app.post('/upload',upload.single('avatar') ,(req,res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});    
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});
