const express = require('express');

const cors = require('cors');

const app = express();

require('./config/connect');

app.use(express.json());

app.use(cors());

const contactRoute =require('./routes/contact');

const userRoute =require('./routes/user');

app.use('/contact',  contactRoute);
app.use('/user', userRoute);

app.use('/image', express.static('./uploads'));






app.listen(3000, (req, res) => {
    console.log('server work on port 3000');
});