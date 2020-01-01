const express       =     require('express');
const graphqlHttp   =     require('express-graphql');
const { buildSchema } =   require('graphql');
const mongoose      =     require('mongoose');
const bcrypt        =     require('bcryptjs');

const app   = express();
let DB = "mongodb://localhost:27017/exams-db"
mongoose
.connect(DB, {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>{
    console.log("DB connected succesfully")
})
.catch(err => {
    console.log(err)
});

const User     = require('./models/user');

app.use('/graphql',graphqlHttp({
    schema: buildSchema(`

    type User {
        _id:ID!
        username: String!
        email: String!
        password: String
        firstname: String!
        lastname: String!
        phone : String!
        course : String!
        level : String!
        birthday: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String
        firstname: String!
        lastname: String!
        phone : String!
        course : String!
        level : String!
        birthday: String!
    }


    type RootQuery {
        events: [String!]!
    }

    type RootMutation {
        createEvent(name: String): String
        createUser(userInput: UserInput): User
    }


    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () =>{
            return ['hey', 'htr' ,'ddd','fsdz','ddd'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        },
        createUser: args =>{
            return bcrypt
            .hash(args.userInput.password , 12)
            .then(hashedPassword => {
                const user = new  User({
                    username: args.userInput.username,
                    email: args.userInput.email,
                    password: hashedPassword,
                    firstname: args.userInput.firstname,
                    lastname: args.userInput.lastname,
                    phone: args.userInput.phone,
                    course: args.userInput.course,
                    level: args.userInput.level,
                    birthday: args.userInput.birthday
                });
                return user.save();
            })
            .then(result => {
                return {...result._doc, _id: result.id};
            })
            .catch(err => {
                throw err
            });
            
        }
    },
    graphiql:true
}));




module.exports = app;