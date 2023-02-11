import * as yup from 'yup';

export const assetCategorySchema = yup.object().shape({
    categoryName: yup.string().required("Required").min(2)
})