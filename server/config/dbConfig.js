import { connect } from 'mongoose';

const db = async()=>{
    try {
        const connection = await connect('mongodb://0.0.0.0:27017/HRManagement', {
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDb Connected Successfully : ${connection.connection.host} `);

    } catch (error) {
        console.log('==========>',error);
    }
};

export default db;