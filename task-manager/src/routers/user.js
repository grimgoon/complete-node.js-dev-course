const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
    limits: {
        fileSize: 2000000,
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            cb(new Error('File must be an image'));
        }
        cb(undefined,true)
    }
})



router.post('/users', async (req,res) => {

    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', authMiddleware, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token !==  req.token;
        })
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', authMiddleware, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/users/me', authMiddleware, async (req, res) => {
    res.send(req.user);
});

router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(e) {
        res.status(400).send();
    }
});

router.patch('/users/me', authMiddleware, async (req,res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password','age'];
    let isValidOperation = updates.every(update =>  allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error : 'Invalid Updates'});
    }

    try {
        const user = req.user;
        updates.forEach((update) => user[update] = req.body[update]);
        
        await user.save();
        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', authMiddleware, async (req, res) => {

    try {
        //Old way:
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();
        res.send(user);

    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/me/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
        req.user.avatar = buffer; 
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
   
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});    
})

router.delete('/users/me/avatar', authMiddleware, async (req,res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        
        if(!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch(e) {
        res.status(404).send();
    }
})

module.exports = router;