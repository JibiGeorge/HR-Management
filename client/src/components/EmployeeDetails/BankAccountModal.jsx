import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccount, updateBankAccount } from '../../helper/Employeehelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setBankAccount } from '../../redux/features/bankAccountSlice'

const BankAccountModal = ({ closeModal, id }) => {

    const dispatch = useDispatch()

    const { loading } = useSelector(state => state.alerts)
    const [empBankAccount, setEmpBankAccount] = useState('')

    useEffect(() => {
        (async () => {
            const accountDetails = await getBankAccount(id)
            if (accountDetails.success) {
                setEmpBankAccount(accountDetails.account)
            }
        })();
    }, []);

    const handleUpdateBankAccount = async () => {
        dispatch(showLoading())
        try {
            const update = await updateBankAccount(empBankAccount, id);
            if (update.success) {
                const accountDetails = await getBankAccount(id)
                if (accountDetails.success) {
                    dispatch(setBankAccount(accountDetails.account))
                }
                toast.success(update.message, {
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
                closeModal();
                dispatch(hideLoading())
            } else {
                toast.error(update.message, {
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
                dispatch(hideLoading())
            }
        } catch (error) {
            toast.error('Not Updated. Something Wrong..!', {
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
            dispatch(hideLoading())
        }
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Update Bank Account</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Holder Name</label>
                                        <input type="text" className="form-control"
                                            value={empBankAccount?.holderName}
                                            onChange={(e) => setEmpBankAccount({ ...empBankAccount, holderName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Account Number</label>
                                        <input type="number" className="form-control"
                                            value={empBankAccount?.accountNumber}
                                            onChange={(e) => setEmpBankAccount({ ...empBankAccount, accountNumber: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Bank Name</label>
                                        <input type="text" className="form-control"
                                            value={empBankAccount?.bankName}
                                            onChange={(e) => setEmpBankAccount({ ...empBankAccount, bankName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Branch Name</label>
                                        <input type="text" className="form-control"
                                            value={empBankAccount?.branchName}
                                            onChange={(e) => setEmpBankAccount({ ...empBankAccount, branchName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>IFSC Code</label>
                                        <input type="text" className="form-control"
                                            value={empBankAccount?.ifscCode}
                                            onChange={(e) => setEmpBankAccount({ ...empBankAccount, ifscCode: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                {loading && <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}
                                {!loading &&
                                    <div className="button">
                                        <div>
                                            <button className="btn btn-primary" onClick={handleUpdateBankAccount}>Save</button>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" onClick={closeModal}>Cancel</button>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankAccountModal