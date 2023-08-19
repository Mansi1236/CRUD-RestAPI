const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); 
const taskRouter = require('./routes/TaskRoutes')

dotenv.config();

const app = express();

// middleware
app.use(cors());

app.use(express.json());

app.use('/tasks', taskRouter)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', () => {
    console.log("Connection Error")
})

db.once('open', ()=> {
    console.log('Connected')
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})