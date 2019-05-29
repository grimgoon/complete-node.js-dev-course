const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Alexander',
    email: 'alexander@example.com',
    password: 'test1234!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'test1234'       
    }).expect(201);

    //Assert that the data was changed correctly
    const user = await User.findById(response.body.user.userObject._id);
    expect(user).not.toBeNull();

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            userObject: {
                name: 'Andrew',
                email: 'andrew@example.com'
            }, 
        }
    });

    expect(user.password).not.toBe('test1234');

});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);

});

test('Should not login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'badPassword'
    }).expect(400);
});
 
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})

test('Should not delete profile for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/image.png')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me').send({
            name: 'Alexander'
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toBe(response.body.userObject.name);
});

test('Should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/users/me').send({
            location: 'Sweden'
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400);
});