import * as yup from 'yup';
const FILE_SIZE = 195.3125 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

export const employeeSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    empCode: yup.number().positive().integer().required("Required"),
    department: yup.string().required("Required"),
    designation: yup.string().required("Required"),
    role: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    dateofJoin: yup.date().required("Required"),
    username: yup.string().required("User Name Required").min(5),
    email: yup.string().email("Please Enter Valid Email").required("Required"),
    contactNumber: yup.number().positive().integer().required("Required"),
    image: yup
        .mixed()
        .required("A file is required - 200KB")
        .test(
            "fileSize",
            "File too large - MAX 200KB",
            value => value && value.size <= FILE_SIZE
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        )
});