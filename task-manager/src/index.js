const express = require('express');
require('./db/mongoose');

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     return res.status(503).send("Maintenance Mode");
// });


// app.use((req, res, next) => {
//     console.log(req.method, req.path);

//     if(req.method === "GET") {
//         return res.send("error");
//     }

//     next();
// });

app.use(express.json());

// Load in routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});
