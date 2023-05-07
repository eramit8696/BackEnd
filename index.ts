import express from 'express';
import { AdminRoute } from './routes'
import { VandorRoute } from './routes'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGO_URI } from './config';


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);
mongoose
        .connect(MONGO_URI)
        .then((result) => {
                console.log(
                        'Connected to Distribution API Database - Initial Connection'
                );
        })
        .catch((err) => {
                console.log(
                        `Initial Distribution API Database connection error occured -`,
                        err
                );
        })

app.use('/', (req, res) => {
        return res.json('Hello From food Amit Cart')
})

app.listen(8000, () => {
        console.log(`Listening to port 8000 `);
})
