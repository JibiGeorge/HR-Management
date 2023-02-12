import * as yup from 'yup'

export const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Required"),
    newPassword: yup.string().required("Required").min(6)
})