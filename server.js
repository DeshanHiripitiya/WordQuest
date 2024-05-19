const express = require('express');
const connectDatabase = require('./config/db');

const app = express();

connectDatabase();

// Init Middleware
app.use(express.json({extended:false}));

//routes
app.use('/api/words', require('./routes/api/words'));

const PORT = process.env.PORT || 5000; //search environment variable called port when deploy in horoku..in local uses port 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`));