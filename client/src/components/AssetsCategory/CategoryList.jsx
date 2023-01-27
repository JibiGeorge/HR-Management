import React from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAssetsCategory } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'

const CategoryList = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alerts);
    let { category } = useSelector(state => state.assetsCategory);
    useEffect(() => {
        (async () => {
            try {
                const categories = await getAssetsCategory();
                if (categories.success) {
                    dispatch(setAssetsCategories(categories))
                } else {
                    toast.error(categories.message, {
                        style: {
                            border: '1px solid #713200',
                            padding: '16px',
                            color: '#713200',
                        },
                        iconTheme: {
                            primary: '#713200',
                            secondary: '#FFFAEE',
                        },
                    });
                }
            } catch (error) {
                toast.error('Something Wrong', {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
            }
        })()
    }, []);
    
    const column = [
        {
            name: '#',
            selector: 'serial'
        },
        {
            name: 'Category',
            selector: row => row.categoryName,
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn btn-primary me-2 editBtn'>Edit</button>,
            <button className='btn btn-danger deleteBtn'>Delete</button>])
        }
    ]
    return (
        <>
            <Toaster
                position='top-right'
                reverseOrder={false}
            />
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&
                <DataTable
                    columns={column}
                    data={category}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        [<input type='text'
                            placeHolder='Search By Category'
                            className='w-25 form-control' />,
                        <button className='btn btn-sm btn-info ms-3'>Export</button>]
                    }
                    subHeaderAlign='left'
                />}
        </>
    )
}

export default CategoryList