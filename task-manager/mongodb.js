// CRUD - Create, Read, Update, Delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();

// console.log(id.id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL,{ useNewUrlParser : true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');
    }
    
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     _id : id,
    //     name : 'Vikram',
    //     age : 32,
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

    // db.collection('tasks').insertMany([
    //     {
    //         description : 'Clean kitchen',
    //         completed : false,
    //     },
    //     {
    //         description : 'Fix toilet',
    //         completed : false,
    //     },
    //     {
    //         description : 'Meep the Morp',
    //         completed : true,
    //     },
    // ], (error, response) => {
    //     if(error) {
    //         return console.log('Unable to insert documents');
    //     }  

    //     console.log(response.ops);

    // });

    // db.collection('users').findOne({ _id : new ObjectID("5c94b190f99a60097cd93b2a")}, (error, user) => {
    //     if(error) {
    //         console.log('Unable to fetch');
    //     }

    //     console.log(user);

    // });

    
    // db.collection('users').find({age : 27}).toArray((error,users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({age : 27}, ).count((error,count) => {
    //     console.log(count);
    // });


    // db.collection('tasks').findOne({_id : new ObjectID("5c94a70a59a2523cccb86cad")},(error,tasks) => {
    //     console.log(tasks);
    // });

    // db.collection('tasks').find({completed : false}).toArray((error,tasks) => {
    //     console.log(tasks);
    // });

    // db.collection('users').updateOne({
    //     _id : new ObjectID("5c9498aa465907161092fc38")
    // }, {
    //     $inc : {
    //         age : 1,
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount);
    //     console.log(result.matchedCount);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').updateMany(
    //     {
    //         completed : false
    //     }, {
    //         $set : { 
    //             completed : true
    //         }
    //     }).then(() => {
    //       console.log('Success');  
    //     }).catch((error) => {
    //         console.log(error);
    //     });


    db.collection('users').deleteMany({
        age : 28
    }).then((result) => { 
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

    db.collection('tasks').deleteOne({
        description : "Clean kitchen"
    }).then((result) => { 
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

});
