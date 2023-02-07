import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetsCategory, getAssetCategoryDetails, updateCategoryData } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'

const EditCategory = ({closeModal,id}) => {
    const {userDetails} = useSelector(state => state.user);

    const [categoryData, setCategoryData] = useState('')
    const dispatch = useDispatch();
    const token = userDetails.UserToken;

    useEffect(()=>{
        (async()=>{
            try {
                const data = await getAssetCategoryDetails(id,token)
                if(data.success){
                    setCategoryData(data.response)
                }else{
                    toast.error(data.message, {
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
                toast.error('Someting went Wrong...!', {
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
    },[])

    const updateData = async ()=>{
        try {
            const response = await updateCategoryData(categoryData,token)
            if(response.updated){
                const categories = await getAllAssetsCategory(token)
                if(categories.success){
                    dispatch(setAssetsCategories(categories))
                    toast.success(response.message, {
                        style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: '#25ab11',
                        },
                        iconTheme: {
                          primary: '#25ab11',
                          secondary: '#FFFAEE',
                        },
                      });
                      closeModal()
                }                
            }else{
                toast.error(response.message, {
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
            toast.error('Someting went Wrong...!', {
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
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Update Assets Category</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Assets Category Name</label>
                                        <input type="text" className='form-control' id='categoryName' value={categoryData.categoryName}
                                        onChange={(e) => setCategoryData({ ...categoryData, categoryName: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={ ()=> updateData()}>Save</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCategory