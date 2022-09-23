import express from 'express';
import toDoRouter from './Routes.js';
import mongoose from 'mongoose';
import cors from 'cors'



const db = mongoose.connection;

const app = express();


mongoose.connect('mongodb://localhost:27017/toDoApp');
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Database Connected');
});

app.use(cors({origin: true }))
app.use(express.json())
app.use('/', toDoRouter);



app.listen(9000, () => {
  console.log('listening on port 9000');
});
