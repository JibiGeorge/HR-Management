import * as yup from 'yup';

export const employeeSchema = yup.object().shape({
    email: yup.string().email("Please Enter Valid Email").required("Required"),
    contactNumber: yup.number().positive().integer().required("Required"),
    username: yup.string().min(5),
});