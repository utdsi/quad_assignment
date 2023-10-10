

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {sequelize} = require('./config/db.js');

const {auth} = require('./middleware/auth.js')





app.use(express.json())
app.use(cors())




app.use('/details', auth, require('./routes/details'));
app.use('/update', auth, require('./routes/update'));
app.use('/image', auth, require('./routes/image'));
app.use('/insert', auth, require('./routes/insert'));
app.use('/delete', auth, require('./routes/delete'));

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT,async()=>{

    try {
        await sequelize.sync();
        console.log("connected to db")
    } catch (error) {

        console.log(error)
        
    }
})
