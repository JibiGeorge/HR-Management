import { model, Schema } from "mongoose";

const HolidaySchema = Schema({
    nameOfTheHoliday: {
        type: String,
        require: true,
        trim: true
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        require: true
    }
})

const Holiday = model('holiday', HolidaySchema);
export default Holiday;