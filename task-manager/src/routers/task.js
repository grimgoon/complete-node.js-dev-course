const express  = require('express');
const router = new express.Router();
const authMiddleware = require('../middleware/auth');
const Task = require('../models/task');

//GET /tasks/?completed=true,
//GET /tasks?/limit=10&skip=0
router.get('/tasks', authMiddleware, async (req, res) => {
    const match = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match, 
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
            }
        }).execPopulate();
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

router.get('/tasks/:id',authMiddleware , async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch(e) {
        res.status(500).send();
    }
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
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        // Same as above but above works with schemas
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new : true, runValidators : true});

        if(!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task);

    } catch(e) {
        res.status(400).send(e);
    }
});


router.delete('/tasks/:id', authMiddleware,  async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;