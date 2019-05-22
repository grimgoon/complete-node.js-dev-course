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

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});

const Task  = require('./models/task');
const User = require('./models/user');
const main = async () => {
    // const task = await Task.findById('5ce55140121d4c3c541ed891');
    // await task.populate('owner').execPopulate();
    // console.log(task);

    const user = await User.findById('5ce513ed92f9972a4009bffa');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);

}

main();