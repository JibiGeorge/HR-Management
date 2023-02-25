import { connect } from 'mongoose';

const url = 'mongodb+srv://hrmanagement:hrmanagement@hrmanagement.pkak7gi.mongodb.net/HRManagement?retryWrites=true&w=majority'

const db = async () => {
    try {
        // const connection = await connect(process.env.MONGO_URL, {
        //     useNewUrlParser: true,
        //     // useFindAndModify: false,
        //     useUnifiedTopology: true
        // });
        // console.log(`MongoDb Connected Successfully : ${connection.connection.host} `);
        const connection = await connect(url,{
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        }).then(()=>{
            console.log('MongoDb Connected Successfully');
        }).catch((e)=> console.log('Connection Issue:-',e))

    } catch (error) {
        console.log('==========>', error);
    }
};

export default db;