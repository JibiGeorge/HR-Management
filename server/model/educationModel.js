import mongoose, { model, Schema } from "mongoose";

const EducationSchema = Schema({
    employee: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    education: {
        type: [{
            collegeName: String,
            courseName: String,
            startFrom: Date,
            endto: Date
        }]
    }
});

const EducationModel = model('education', EducationSchema);
export default EducationModel;