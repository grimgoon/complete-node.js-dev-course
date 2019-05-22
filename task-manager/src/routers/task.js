const express  = require('express');
const router = new express.Router();
const authMiddleware = require('../middleware/auth');
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch(e) {
        res.status(500).send();
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch(e) {
        res.status(500).send();
    }

    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(400).send();
    //     }

    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
});

router.post('/tasks', authMiddleware, async (req,res) => {
    const task = new Task ({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }

    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
});

router.patch('/tasks/:id', async (req,res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed','description'];
    let isValidOperation = updates.every(update =>  allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error : 'Invalid Updates'});
    }

    try {

        const task = await Task.findById(req.params.id);

        updates.forEach((update) => task[update] = req.body[update]);

        await task.save();

        // Same as above but above works with schemas
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new : true, runValidators : true});

        if(!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch(e) {
        res.status(400).send(e);
    }
});


router.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;