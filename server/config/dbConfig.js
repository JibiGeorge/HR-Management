import { connect } from 'mongoose';

const db = async () => {
    try {
        const connection = await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDb Connected Successfully : ${connection.connection.host} `);
    } catch (error) {
        console.log('Databasse Connection Failed', error.mesage);
    }
};

export default db;