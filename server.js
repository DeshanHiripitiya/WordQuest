const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');

const app = express();

connectDatabase();

// Init Middleware
app.use(cors());
app.use(express.json({extended:false}));

//routes
app.use('/api/words', require('./routes/api/words'));
app.use('/api/dictionory', require('./routes/api/dictionory'));
app.use('/api/game', require('./routes/api/game'));



const PORT = process.env.PORT || 5000; //search environment variable called port when deploy in horoku..in local uses port 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`));