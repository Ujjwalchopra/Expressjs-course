const express = require('express');
const path = require('path');
//const {logger} = require('./middleware/Logger');
// const  members  = require('./Members')
// const moment = require('moment')
const app = express();
// var bodyParser = require('body-parser')


const PORT = process.env.PORT || 5000;

// app.use(express.json());// to handle raw json in router for post request
// app.use(express.urlencoded({extended:false})); // to handle form submission through encoded url

// const logger = (req,res,next) => {
//     console.log(`${req.protocol}://${req.get('host')} ${req.originalUrl}: ${moment().format()}`);
//     next();
// }

//app.use(logger);

// app.get('/',(req,res) =>{
//     res.sendFile(path.join(__dirname,'public','index.html'));
// })

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());// to handle raw json in router for post request
app.use(express.urlencoded({extended:false})); // to handle form submission through encoded url

//Member API routes

app.use('/api/members', require('./router/api/members'));

//Body parser middleware functions




// gets all members
// app.get('/api/members', (req, res) => {

//     res.json(members);
// })

// //gets single member

// app.get('/api/members/:id', (req, res) => {
//     // res.send(req.params.id);
//     const found 
//     = members.some(member => member.id === parseInt(req.params.id));

//     if (found) {
//         res.json(members.filter(member => member.id === parseInt(req.params.id)));
//     }
//     else {
//         res.status(400).json({ msg: `No member with id of ${req.params.id}` })
//     }

// });

app.listen(PORT, () => {
    console.log("server start!");
})