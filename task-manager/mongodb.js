// CRUD - Create, Read, Update, Delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL,{ useNewUrlParser : true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');
    }
    
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name : 'Andrew',
    //     age : 27,
    // },(error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user');
    //     }
        
    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28,
    //     },
    //     {
    //         name : 'Meep',
    //         age : 26,
    //     },  
    // ], (error, result) => {
    //     if(error) {
    //         console.log('Unable to insert documents');
    //     }

    //     console.log(result.ops);
    // });

    db.collection('tasks').insertMany([
        {
            description : 'Clean kitchen',
            completed : false,
        },
        {
            description : 'Fix toilet',
            completed : false,
        },
        {
            description : 'Meep the Morp',
            completed : true,
        },
    ], (error, response) => {
        if(error) {
            return console.log('Unable to insert documents');
        }  

        console.log(response.ops);

    });



});
