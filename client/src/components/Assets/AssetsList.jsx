import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux'
import { getAssets } from '../../helper/AssetsHelper';
import { setAssets } from '../../redux/features/assetsSlice';
import DeleteConfirmation from './DeleteConfirmation';
import EditAssets from './EditAssets';

const AssetsList = () => {
    const { loading } = useSelector(state => state.alerts);
    const { assets } = useSelector(state => state.assets);
    const { userDetails } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const closeDeleteModal = () => setDeleteModal(false)
    const closeUpdateModal = () => setUpdateModal(false)

    const [filteredData, setFilteredData] = useState(assets)

    const token = userDetails.UserToken;

    useEffect(() => {
        (async () => {
            const assets = await getAssets(token);
            dispatch(setAssets(assets?.assets))
        })();
    }, []);


    const handleDelete = async (id) => {
        setId(id)
        setDeleteModal(true)
    }

    const handleEdit = async (id) => {
        setId(id)
        setUpdateModal(true)
    }

    const column = [
        {
            name: 'Category',
            selector: row => row?.assetCategory?.categoryName
        },
        {
            name: 'Assets Name',
            selector: row => row?.assetName,
        },
        {
            name: 'Brand',
            selector: row => row?.brand
        },
        {
            name: 'Model',
            selector: row => row?.modelNo
        },
        {
            name: 'Code',
            selector: row => row?.code
        },
        {
            name: 'Configuration',
            selector: row => row?.configuration
        },
        {
            name: 'In Stock',
            selector: row => row?.inStock
        },
        {
            name: 'Purchased On',
            selector: (row) => new Date(row?.purchasedOn).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            })
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={() => handleEdit(row._id)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)} ><i class="las la-trash"></i></button>])
        }
    ]

    const search = (e) => {
        const inputData = e.target.value;
        const searchedData = assets.filter((values) => {
            return values.assetName.toLowerCase().includes(inputData.toLowerCase());
        })
        setFilteredData(searchedData);
    }
    return (
        <>
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&
                <DataTable
                    columns={column}
                    data={filteredData}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        [<input type='text'
                            placeHolder='Search By Asset Name'
                            className='w-25 form-control' onChange={search} />]
                    }
                    subHeaderAlign='left'
                />
            }

            {deleteModal && <DeleteConfirmation closeModal={closeDeleteModal} id={id} />}
            {updateModal && <EditAssets closeModal={closeUpdateModal} id={id} />}
        </>
    )
}

export default AssetsList