import mongoose, { model, Schema } from "mongoose";

const noticeSchema = Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    file: {
        type: String
    }
})

const NoticeModel = model('notice', noticeSchema);
export default NoticeModel;