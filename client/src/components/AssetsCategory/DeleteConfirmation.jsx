import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAssetsCategory, getAllAssetsCategory } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'

const DeleteConfirmation = ({ closeModal,id }) => {
    const dispatch = useDispatch();
    const {userDetails} = useSelector(state => state.user);
    
    const assetsCategoryDelete = async ()=>{
        let token = userDetails.UserToken;
        try {
            const response = await deleteAssetsCategory(id,token);
            if(response.delete){
                const categories = await getAllAssetsCategory(token);
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
            toast.error('Something Wrong. Please Check...!', {
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
                                <h3>Delete Confirmation</h3>
                                <p>Are you Sure want to Delete?</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={assetsCategoryDelete}>Delete</button>
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

export default DeleteConfirmation