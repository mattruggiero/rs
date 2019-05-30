const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
const mongoDB = require('./config/keys').mongoURI;
const path = require('path');
const app = express();

// route vars
const registerNewUser = require('./routes/user/registerNewUser');
const login = require('./routes/user/login');
const addRecord = require('./routes/adminOnly/addRecord');
const browseAll = require('./routes/shop/browseAll');
const search = require('./routes/shop/search');
const getRecords = require('./routes/shop/getRecords');
const cart = require('./routes/user/cart');
const removeRecords = require('./routes/shop/removeRecords');

mongoose
    .connect(mongoDB,{
        useNewUrlParser:true,
        useCreateIndex:true
    })
    .then(()=> console.log('MongoDb Connected'))
    .catch(err=> console.log(err));



app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/*+json'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);




//routes
app.use('/register',registerNewUser);
app.use('/login',login);
app.use('/browseAll',browseAll);
app.use('/search',search);
app.use('/getRecords',getRecords);
app.use('/cart',cart);
app.use('/removeRecords',removeRecords);


//admin only routes
app.use('/addRecord',addRecord);

//Server static assets if in production
//if there is a problem here start with debugging path to build folder
//if that dosent work it may be easier to keep the server(index.js) at the root level

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
    
}





const port = process.env.PORT || 80 ;
app.listen(port, () => console.log(`Server running on port ${port}`)
);