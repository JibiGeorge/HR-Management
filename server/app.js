/* eslint-disable no-undef */
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import db from './config/dbConfig.js';
import dotenv from 'dotenv';
import route from './router/route.js';


// middleware
app.use(morgan('tiny'));
app.use(cors());
dotenv.config();
app.use(express.json());
app.disable('x-powered-by'); //Less hackers know about our stack

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api', route);

db().then(() => {
    try {
        // eslint-disable-next-line no-undef
        app.listen(process.env.PORT, () => {
            console.log(`server connected to http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log('Cannot connect to the Server');
    }
}).catch(error => {
    console.log('Invalid Database Connection', error.message);
});
