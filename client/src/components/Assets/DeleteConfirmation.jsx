import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteAssets, getAssets } from '../../helper/AssetsHelper';
import { setAssets } from '../../redux/features/assetsSlice';

const DeleteConfirmation = ({closeModal, id}) => {
    const dispatch = useDispatch()

    const assetsDelete = async () => {
        try {
            const response = await deleteAssets(id)
            if(response.success){
                const assets = await getAssets()
                dispatch(setAssets(assets.assets))
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
                                        <button className='btn btn-primary' onClick={assetsDelete} >Delete</button>
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