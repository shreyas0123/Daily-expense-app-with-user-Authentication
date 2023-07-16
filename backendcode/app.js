const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const expenseDetails = require('./routes/addexpense');
const signupDetails = require('./routes/signupORlogin');
const loginDetails = require('./routes/signupORlogin');

const User = require('./models/signup');
const Expense = require('./models/define');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(expenseDetails);
app.use(signupDetails);
app.use(loginDetails);

//create an association rules:
//it is one to many relationship because
//one user can add multiple expenses but expenses belongs to one particular user only
//In Sequelize, defining the association rules between models also sets up the foreign key relationships automatically. 
User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then(()=>{
    app.listen(700,()=>{
        console.log('server running on 700 port');
    })
})
.catch((error)=>{
    console.log('error while connecting to database',error);
})

