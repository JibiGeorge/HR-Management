import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetsCategory } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'
import DeleteConfirmation from './DeleteConfirmation'
import EditCategory from './EditCategory'

const CategoryList = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alerts);
    let { category } = useSelector(state => state.assetsCategory);
    const {userDetails} = useSelector(state => state.user);

    const [filteredData, setFilteredData] = useState(category)
    
    useEffect(() => {
        (async () => {
            try {
                let token = userDetails.UserToken;
                const categories = await getAllAssetsCategory(token);
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

    const [deleteModal, setDeleteModal] = useState(false)
    const closeDeleteModal = () => setDeleteModal(false)
    const [id, setId] = useState('')
    // Category Delete
    const handleDelete = (id) => {
        setId(id)
        setDeleteModal(true)
    }

    const [updateModal, setUpdateModal] = useState(false)
    const closeUpdateModal = () => setUpdateModal(false)
    const handleEdit = (id) =>{
        setId(id)
        setUpdateModal(true)
    }

    const column = [
        {
            name: 'Category',
            selector: row => row.categoryName,
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={()=> handleEdit(row._id)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)} ><i class="las la-trash"></i></button>])
        }
    ]

    const search = (e)=>{
        const inputData = e.target.value;
        const searchedData = category.filter((values)=>{
            return values.categoryName.toLowerCase().includes(inputData.toLowerCase());
        })
        setFilteredData(searchedData);
    }
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
            <div>
                {!loading &&
                    <DataTable
                        columns={column}
                        data={filteredData}
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
                                className='w-25 form-control'
                                onChange={search} />]
                        }
                        subHeaderAlign='left'
                    />}
            </div>
            {deleteModal && <DeleteConfirmation closeModal={closeDeleteModal} id={id} />}
            {updateModal && <EditCategory closeModal={closeUpdateModal} id={id} /> }
        </>
    )
}

export default CategoryList