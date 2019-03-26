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

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const passwd = 'Red12345';
    const hashedPassword = await bcrypt.hash(passwd,8);

    console.log(passwd, hashedPassword);

    const isMatch = await bcrypt.compare(passwd, '$2a$08$H6AMUdAiHB.g8gSLp2PbH.Fuu1aMf3Y3FD.OrLA6E5Pw/F3LriKR.');

    console.log(isMatch);
}

myFunction();
