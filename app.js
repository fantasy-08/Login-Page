const express= require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');

const app=express();

//DB
const db=require('./config/keys').MongoURI;

mongoose.connect(db,{useNewUrlParser:true ,useUnifiedTopology: true })
    .then(()=>console.log('DB CONNECTED...'))
    .catch(err=> console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');


//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));




const PORT=process.env.PORT||3000;
app.listen(PORT,console.log(`Server started on ${PORT}`));