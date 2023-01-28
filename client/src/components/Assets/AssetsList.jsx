import React from 'react'
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux'
import { getAssets } from '../../helper/AssetsHelper';
import { setAssets } from '../../redux/features/assetsSlice';

const AssetsList = () => {
    const { loading } = useSelector(state => state.alerts);
    const {assets} = useSelector(state => state.assets);
    const dispatch = useDispatch();

    useEffect(()=>{
        (async()=>{
            const assets = await getAssets()
            dispatch(setAssets(assets.assets))
        })();
    },[]);

    const column = [
        {
            name: 'Category',
            selector: row => row.assetCategory
        },
        {
            name: 'Assets Name',
            selector: row => row.assetName,
        },
        {
            name: 'Brand',
            selector: row => row.brand
        },
        {
            name: 'Model',
            selector: row => row.modelNo
        },
        {
            name: 'Code',
            selector: row => row.code
        },
        {
            name: 'Configuration',
            selector: row => row.configuration
        },
        {
            name: 'In Stock',
            selector: row => row.inStock
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn btn-primary me-2 editBtn'>Edit</button>,
            <button className='btn btn-danger deleteBtn' onClick={() => handleDelete(row._id)} >Delete</button>])
        }
    ]
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
                    data={assets}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    // selectableRows
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
                />
            }
        </>
    )
}

export default AssetsList